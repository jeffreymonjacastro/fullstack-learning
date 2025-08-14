import tkinter as tk
import threading
import time
import os

# Obtener la ruta del directorio donde está este script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SOUND_FILE = os.path.join(SCRIPT_DIR, 'guitar.wav')
ICON_FILE = os.path.join(SCRIPT_DIR, 'pomodorito.ico')

# Opcional: para sonido de notificación
try:
    from playsound import playsound
    print("playsound importado exitosamente")
    print(f"Archivo de sonido: {SOUND_FILE}")
except ImportError as e:
    playsound = None
    print(f"No se pudo importar playsound: {e}")
except Exception as e:
    playsound = None
    print(f"Error al importar playsound: {e}")

class PomodoroTimer:
    # Paleta de colores como atributos de clase
    COLORS = {
        'primary_bg': '#2c3e50',      # Fondo principal (azul oscuro)
        'secondary_bg': '#34495e',    # Fondo secundario (azul gris)
        'text_primary': 'white',      # Texto principal
        'text_secondary': '#7f8c8d',  # Texto secundario (gris)
        'success': '#27ae60',         # Verde (botón play, aplicar)
        'warning': '#f39c12',         # Naranja (botón pausado, tiempo medio)
        'danger': '#e74c3c',          # Rojo (botón reset, cerrar, tiempo crítico)
        'info': '#3498db',            # Azul (botón configuración)
    }
    
    def __init__(self):
        # Configuración del timer Pomodoro
        self.WORK_TIME = 25 * 60        # 25 minutos de trabajo (en segundos)
        self.SHORT_BREAK = 5 * 60       # 5 minutos de descanso corto
        self.LONG_BREAK = 15 * 60       # 15 minutos de descanso largo
        self.POMODORO_TIME = self.WORK_TIME  # Tiempo inicial
        
        # Estado del ciclo Pomodoro
        self.current_cycle = 1          # Ciclo actual (1-4)
        self.total_cycles = 4           # Total de ciclos por sesión
        self.is_break = False           # Si está en descanso o trabajando
        self.session_count = 0          # Contador de sesiones completadas
        
        # Estado del timer
        self.time_left = self.POMODORO_TIME
        self.is_running = False
        self.is_paused = False
        self.config_visible = False
        
        # Crear ventana principal
        self.root = tk.Tk()
        self.setup_window()
        self.create_widgets()
        self.position_window()
        
        # Variables para arrastrar la ventana
        self.drag_start_x = 0
        self.drag_start_y = 0
        
    def setup_window(self):
        """Configurar la ventana principal"""
        self.root.title("Pomodorito")
        
        # Configurar icono de la aplicación (si existe)
        try:
            if os.path.exists(ICON_FILE):
                self.root.iconbitmap(ICON_FILE)
                print(f"✅ Icono cargado: {ICON_FILE}")
            else:
                print(f"⚠️ Icono no encontrado: {ICON_FILE}")
        except Exception as e:
            print(f"❌ Error cargando icono: {e}")
        
        # Tamaño inicial
        self.root.geometry("280x40")
        
        # Hacer la ventana siempre visible encima (opcional, se puede quitar)
        self.root.attributes('-topmost', True)
        
        # IMPORTANTE: Para mantener el icono en la barra de tareas, 
        # primero configuramos el icono y luego quitamos las decoraciones
        self.root.update()  # Asegurar que la ventana se renderice primero
        
        # CAMBIO: Quitar decoraciones de ventana (sin barra de título)
        self.root.overrideredirect(True)
        
        # Hacer semi-transparente
        self.root.attributes('-alpha', 0.9)
        
        # Color de fondo
        self.root.configure(bg=self.COLORS['primary_bg'])
        
        # Obtener dimensiones de pantalla para control de límites
        self.screen_width = self.root.winfo_screenwidth()
        self.screen_height = self.root.winfo_screenheight()
        
    def create_widgets(self):
        """Crear los elementos de la interfaz"""
        # Frame de configuración (inicialmente oculto)
        self.config_frame = tk.Frame(self.root, bg=self.COLORS['secondary_bg'], height=60)
        self.config_frame.pack(side=tk.TOP, fill='x', padx=1)
        self.config_frame.pack_forget()  # Ocultar inicialmente
        
        # Primera fila: Trabajo
        work_frame = tk.Frame(self.config_frame, bg=self.COLORS['secondary_bg'])
        work_frame.pack(fill='x', pady=2)
        
        tk.Label(
            work_frame,
            text="Trabajo:",
            font=('Arial', 8, 'bold'),
            fg=self.COLORS['success'],
            bg=self.COLORS['secondary_bg'],
            width=8
        ).pack(side=tk.LEFT, padx=2)
        
        tk.Label(work_frame, text="Min:", font=('Arial', 8), fg=self.COLORS['text_primary'], bg=self.COLORS['secondary_bg']).pack(side=tk.LEFT)
        self.work_minutes_var = tk.StringVar(value="0")
        self.work_minutes_entry = tk.Entry(work_frame, textvariable=self.work_minutes_var, width=3, font=('Arial', 8), justify='center')
        self.work_minutes_entry.pack(side=tk.LEFT, padx=2)
        
        tk.Label(work_frame, text="Seg:", font=('Arial', 8), fg=self.COLORS['text_primary'], bg=self.COLORS['secondary_bg']).pack(side=tk.LEFT, padx=(5,0))
        self.work_seconds_var = tk.StringVar(value="3")
        self.work_seconds_entry = tk.Entry(work_frame, textvariable=self.work_seconds_var, width=3, font=('Arial', 8), justify='center')
        self.work_seconds_entry.pack(side=tk.LEFT, padx=2)
        
        # Segunda fila: Descanso Corto
        break_frame = tk.Frame(self.config_frame, bg=self.COLORS['secondary_bg'])
        break_frame.pack(fill='x', pady=2)
        
        tk.Label(
            break_frame,
            text="D.Corto:",
            font=('Arial', 8, 'bold'),
            fg=self.COLORS['warning'],
            bg=self.COLORS['secondary_bg'],
            width=8
        ).pack(side=tk.LEFT, padx=2)
        
        tk.Label(break_frame, text="Min:", font=('Arial', 8), fg=self.COLORS['text_primary'], bg=self.COLORS['secondary_bg']).pack(side=tk.LEFT)
        self.short_minutes_var = tk.StringVar(value="0")
        self.short_minutes_entry = tk.Entry(break_frame, textvariable=self.short_minutes_var, width=3, font=('Arial', 8), justify='center')
        self.short_minutes_entry.pack(side=tk.LEFT, padx=2)
        
        tk.Label(break_frame, text="Seg:", font=('Arial', 8), fg=self.COLORS['text_primary'], bg=self.COLORS['secondary_bg']).pack(side=tk.LEFT, padx=(5,0))
        self.short_seconds_var = tk.StringVar(value="4")
        self.short_seconds_entry = tk.Entry(break_frame, textvariable=self.short_seconds_var, width=3, font=('Arial', 8), justify='center')
        self.short_seconds_entry.pack(side=tk.LEFT, padx=2)
        
        # Tercera fila: Descanso Largo
        long_break_frame = tk.Frame(self.config_frame, bg=self.COLORS['secondary_bg'])
        long_break_frame.pack(fill='x', pady=2)
        
        tk.Label(
            long_break_frame,
            text="D.Largo:",
            font=('Arial', 8, 'bold'),
            fg=self.COLORS['info'],
            bg=self.COLORS['secondary_bg'],
            width=8
        ).pack(side=tk.LEFT, padx=2)
        
        tk.Label(long_break_frame, text="Min:", font=('Arial', 8), fg=self.COLORS['text_primary'], bg=self.COLORS['secondary_bg']).pack(side=tk.LEFT)
        self.long_minutes_var = tk.StringVar(value="0")
        self.long_minutes_entry = tk.Entry(long_break_frame, textvariable=self.long_minutes_var, width=3, font=('Arial', 8), justify='center')
        self.long_minutes_entry.pack(side=tk.LEFT, padx=2)
        
        tk.Label(long_break_frame, text="Seg:", font=('Arial', 8), fg=self.COLORS['text_primary'], bg=self.COLORS['secondary_bg']).pack(side=tk.LEFT, padx=(5,0))
        self.long_seconds_var = tk.StringVar(value="5")
        self.long_seconds_entry = tk.Entry(long_break_frame, textvariable=self.long_seconds_var, width=3, font=('Arial', 8), justify='center')
        self.long_seconds_entry.pack(side=tk.LEFT, padx=2)
        
        # Botón aplicar cambios (centrado)
        apply_frame = tk.Frame(self.config_frame, bg=self.COLORS['secondary_bg'])
        apply_frame.pack(fill='x', pady=2)
        
        apply_button = tk.Button(
            apply_frame,
            text="✓ Aplicar",
            command=self.apply_config,
            width=10,
            height=1,
            font=('Arial', 8, 'bold'),
            bg=self.COLORS['success'],
            fg=self.COLORS['text_primary'],
            border=0,
            cursor='hand2'
        )
        apply_button.pack()
        
        # Frame principal - configurado para layout horizontal
        main_frame = tk.Frame(
            self.root, 
            bg=self.COLORS['primary_bg']
        )
        main_frame.pack(fill='both', expand=True)
        
        # Frame izquierdo: zona de arrastre + display del tiempo
        left_frame = tk.Frame(
            main_frame, 
            bg=self.COLORS['secondary_bg'], 
            cursor='hand2', 
            width=70
        )
        left_frame.pack(
            side=tk.LEFT, 
            fill='both', 
            expand=True, 
            padx=1, 
            pady=1
        )
        left_frame.pack_propagate(False)  # Mantener tamaño fijo
        
        # Zona de arrastre (parte izquierda de left_frame)
        self.drag_area = tk.Label(
            left_frame,
            text="⋮⋮",  # Símbolo para indicar zona de arrastre
            font=('Arial', 8),
            fg=self.COLORS['text_secondary'],
            bg=self.COLORS['secondary_bg'],
            cursor='hand2',
            width=2
        )
        self.drag_area.pack(side=tk.LEFT, fill='y', padx=2)
        
        # Display del tiempo
        self.time_label = tk.Label(
            left_frame,
            text=self.format_time(self.time_left),
            font=('Arial', 16, 'bold'),
            fg=self.COLORS['text_primary'],
            bg=self.COLORS['secondary_bg']
        )
        self.time_label.pack(side=tk.LEFT, fill='both', expand=True)
        
        # Label para mostrar el ciclo actual
        self.cycle_label = tk.Label(
            left_frame,
            text=self.get_cycle_text(),
            font=('Arial', 8),
            fg=self.COLORS['text_secondary'],
            bg=self.COLORS['secondary_bg']
        )
        self.cycle_label.pack(side=tk.RIGHT, padx=(0, 5))
        
        # Configurar eventos de arrastre solo en la zona de arrastre
        self.drag_area.bind('<Button-1>', self.start_drag)
        self.drag_area.bind('<B1-Motion>', self.drag_window)
        
        # Frame derecho: botones con íconos
        button_frame = tk.Frame(
            main_frame, 
            bg=self.COLORS['primary_bg'], 
            width=120
        )
        button_frame.pack(side=tk.RIGHT, fill='y')
        button_frame.pack_propagate(False)  # Mantener tamaño fijo
        
        # Botón Start/Pause con ícono
        self.start_button = tk.Button(
            button_frame,
            text="▶",  # Ícono play
            command=self.toggle_timer,
            width=2,
            height=1,
            font=('Arial', 16, 'bold'),
            bg=self.COLORS['primary_bg'],  # Mismo color que el fondo
            fg=self.COLORS['text_primary'],     # Color del ícono
            border=0,
            relief='flat',
            highlightthickness=0,
            activebackground=self.COLORS['success'],  # Color al hacer hover
            activeforeground=self.COLORS['text_primary'],
            cursor='hand2'
        )
        self.start_button.pack(side=tk.LEFT, padx=1)
        
        # Botón Reset con ícono
        self.reset_button = tk.Button(
            button_frame,
            text="■",  # Ícono cuadrado/stop
            command=self.reset_timer,
            width=2,
            height=1,
            font=('Arial', 16, 'bold'),
            bg=self.COLORS['primary_bg'],  # Mismo color que el fondo
            fg=self.COLORS['text_primary'],      # Color del ícono
            border=0,
            relief='flat',
            highlightthickness=0,
            activebackground=self.COLORS['danger'],
            activeforeground=self.COLORS['text_primary'],
            cursor='hand2'
        )
        self.reset_button.pack(side=tk.LEFT, padx=1)
        
        # Botón Configuración con ícono
        self.config_button = tk.Button(
            button_frame,
            text="⚙",  # Ícono configuración
            command=self.toggle_config,
            width=2,
            height=1,
            font=('Arial', 10, 'bold'),
            bg=self.COLORS['primary_bg'],  # Mismo color que el fondo
            fg=self.COLORS['text_primary'],        # Color del ícono
            border=0,
            relief='flat',
            highlightthickness=0,
            activebackground=self.COLORS['info'],
            activeforeground=self.COLORS['text_primary'],
            cursor='hand2'
        )
        self.config_button.pack(side=tk.LEFT, padx=1)
        
        # Botón Cerrar con ícono X
        self.close_button = tk.Button(
            button_frame,
            text="✕",  # Ícono X para cerrar
            command=self.close_app,
            width=2,
            height=1,
            font=('Arial', 10, 'bold'),
            bg=self.COLORS['primary_bg'],  # Mismo color que el fondo
            fg=self.COLORS['text_primary'],      # Color del ícono
            border=0,
            relief='flat',
            highlightthickness=0,
            activebackground=self.COLORS['danger'],
            activeforeground=self.COLORS['text_primary'],
            cursor='hand2'
        )
        self.close_button.pack(side=tk.LEFT, padx=1)
        
    def position_window(self):
        """Posicionar ventana en esquina inferior izquierda sin padding"""
        self.root.update()  # Asegurar que la ventana esté renderizada

        # Obtener dimensiones de la ventana
        window_width = self.root.winfo_width()
        window_height = self.root.winfo_height()
        
        # Posición: esquina inferior izquierda sin padding
        x = self.screen_width - window_width  # Pegado al borde derecho
        y = self.screen_height - window_height  # Pegado al borde inferior
        
        # Posicionar la ventana
        self.root.geometry(f"{window_width}x{window_height}+{x}+{y}")
        
    def start_drag(self, event):
        """Iniciar arrastre de ventana desde la zona específica"""
        self.drag_start_x = event.x
        self.drag_start_y = event.y
        
    def drag_window(self, event):
        """Arrastrar ventana con límites de pantalla"""
        # Calcular nueva posición
        new_x = self.root.winfo_x() + (event.x - self.drag_start_x)
        new_y = self.root.winfo_y() + (event.y - self.drag_start_y)
        
        # Aplicar límites de pantalla para evitar que se desaparezca
        window_width = self.root.winfo_width()
        window_height = self.root.winfo_height()
        
        # Límite izquierdo: no menos de 0
        if new_x < 0:
            new_x = 0
        # Límite derecho: no más que ancho de pantalla - ancho de ventana
        elif new_x + window_width > self.screen_width:
            new_x = self.screen_width - window_width
            
        # Límite superior: no menos de 0
        if new_y < 0:
            new_y = 0
        # Límite inferior: no más que alto de pantalla - alto de ventana
        elif new_y + window_height > self.screen_height:
            new_y = self.screen_height - window_height
        
        # Aplicar nueva posición
        self.root.geometry(f"+{new_x}+{new_y}")
        
    def toggle_config(self):
        """Mostrar/ocultar panel de configuración"""
        if not self.config_visible:
            # Obtener posición actual antes de expandir
            current_x = self.root.winfo_x()
            current_y = self.root.winfo_y()
            current_height = self.root.winfo_height()
            
            # Mostrar configuración
            self.config_frame.pack(side=tk.TOP, fill='x', padx=1, before=self.root.children['!frame2'])
            self.config_visible = True
            
            # Actualizar tamaño de ventana (más alto para 4 filas)
            new_height = 120  # Altura original + altura del panel expandido con 4 filas
            current_width = self.root.winfo_width()
            
            # Calcular nueva posición Y para que se expanda hacia arriba
            height_difference = new_height - current_height
            new_y = current_y - height_difference
            
            # Asegurar que no se salga de la pantalla por arriba
            if new_y < 0:
                new_y = 0
            
            self.root.geometry(f"{current_width}x{new_height}+{current_x}+{new_y}")
            
            # Actualizar campos con valores actuales
            work_minutes = self.WORK_TIME // 60
            work_seconds = self.WORK_TIME % 60
            self.work_minutes_var.set(str(work_minutes))
            self.work_seconds_var.set(str(work_seconds))
            
            short_minutes = self.SHORT_BREAK // 60
            short_seconds = self.SHORT_BREAK % 60
            self.short_minutes_var.set(str(short_minutes))
            self.short_seconds_var.set(str(short_seconds))
            
            long_minutes = self.LONG_BREAK // 60
            long_seconds = self.LONG_BREAK % 60
            self.long_minutes_var.set(str(long_minutes))
            self.long_seconds_var.set(str(long_seconds))
        else:
            # Obtener posición actual antes de contraer
            current_x = self.root.winfo_x()
            current_y = self.root.winfo_y()
            current_height = self.root.winfo_height()
            
            # Ocultar configuración
            self.config_frame.pack_forget()
            self.config_visible = False
            
            # Restaurar tamaño original
            original_height = 40
            current_width = self.root.winfo_width()
            
            # Calcular nueva posición Y para que se contraiga hacia arriba
            height_difference = current_height - original_height
            new_y = current_y + height_difference
            
            self.root.geometry(f"{current_width}x{original_height}+{current_x}+{new_y}")
            
    def apply_config(self):
        """Aplicar nueva configuración de tiempos"""
        try:
            # Obtener valores de trabajo
            work_minutes = int(self.work_minutes_var.get()) if self.work_minutes_var.get() else 0
            work_seconds = int(self.work_seconds_var.get()) if self.work_seconds_var.get() else 0
            
            # Obtener valores de descanso corto
            short_minutes = int(self.short_minutes_var.get()) if self.short_minutes_var.get() else 0
            short_seconds = int(self.short_seconds_var.get()) if self.short_seconds_var.get() else 0
            
            # Obtener valores de descanso largo
            long_minutes = int(self.long_minutes_var.get()) if self.long_minutes_var.get() else 0
            long_seconds = int(self.long_seconds_var.get()) if self.long_seconds_var.get() else 0
            
            # Validar que no sean valores negativos
            if any(val < 0 for val in [work_minutes, work_seconds, short_minutes, short_seconds, long_minutes, long_seconds]):
                raise ValueError("Los valores no pueden ser negativos")
                
            # Validar que los segundos no sean más de 59
            if work_seconds > 59 or short_seconds > 59 or long_seconds > 59:
                raise ValueError("Los segundos no pueden ser más de 59")
                
            # Calcular tiempos totales en segundos
            work_total = work_minutes * 60 + work_seconds
            short_total = short_minutes * 60 + short_seconds
            long_total = long_minutes * 60 + long_seconds
            
            # Validar que haya al menos 1 segundo en cada tipo
            if work_total < 1 or short_total < 1 or long_total < 1:
                raise ValueError("Todos los tiempos deben ser al menos 1 segundo")
                
            # Aplicar nueva configuración
            self.WORK_TIME = work_total
            self.SHORT_BREAK = short_total
            self.LONG_BREAK = long_total
            
            # Actualizar tiempo actual si no está corriendo
            if not self.is_break:
                self.POMODORO_TIME = self.WORK_TIME
                self.time_left = self.POMODORO_TIME
            elif self.current_cycle > self.total_cycles:
                # Está en descanso largo
                self.POMODORO_TIME = self.LONG_BREAK
                self.time_left = self.POMODORO_TIME
            else:
                # Está en descanso corto
                self.POMODORO_TIME = self.SHORT_BREAK
                self.time_left = self.POMODORO_TIME
            
            # Resetear timer si está corriendo
            if self.is_running or self.is_paused:
                self.reset_timer()
                
            # Actualizar display
            self.update_display()
            
            # Ocultar panel de configuración
            self.toggle_config()
            
            print(f"Configuración aplicada:")
            print(f"- Trabajo: {work_minutes:02d}:{work_seconds:02d}")
            print(f"- Descanso corto: {short_minutes:02d}:{short_seconds:02d}")
            print(f"- Descanso largo: {long_minutes:02d}:{long_seconds:02d}")
            
        except ValueError as e:
            print(f"Error en configuración: {e}")
            # En caso de error, restaurar valores válidos
            work_minutes = self.WORK_TIME // 60
            work_seconds = self.WORK_TIME % 60
            self.work_minutes_var.set(str(work_minutes))
            self.work_seconds_var.set(str(work_seconds))
            
            short_minutes = self.SHORT_BREAK // 60
            short_seconds = self.SHORT_BREAK % 60
            self.short_minutes_var.set(str(short_minutes))
            self.short_seconds_var.set(str(short_seconds))
            
            long_minutes = self.LONG_BREAK // 60
            long_seconds = self.LONG_BREAK % 60
            self.long_minutes_var.set(str(long_minutes))
            self.long_seconds_var.set(str(long_seconds))
        
    def close_app(self):
        """Cerrar la aplicación"""
        print("Cerrando Pomodoro Timer...")
        self.root.quit()
        self.root.destroy()
        
    def get_cycle_text(self):
        """Obtener el texto del ciclo actual"""
        if self.is_break:
            if self.current_cycle > self.total_cycles:
                return "Descanso\nLargo"
            else:
                return "Descanso\nCorto"
        else:
            return f"{self.current_cycle}/{self.total_cycles}"
            
    def next_cycle(self):
        """Avanzar al siguiente ciclo del Pomodoro"""
        if not self.is_break:
            # Terminó un período de trabajo
            if self.current_cycle >= self.total_cycles:
                # Después del 4to ciclo: descanso largo
                self.is_break = True
                self.POMODORO_TIME = self.LONG_BREAK
                self.current_cycle += 1  # Para indicar que terminó la sesión
                print(f"¡Sesión completa! Tiempo para un descanso largo de {self.LONG_BREAK//60} minutos")
            else:
                # Descanso corto después de ciclos 1, 2, 3
                self.is_break = True
                self.POMODORO_TIME = self.SHORT_BREAK
                print(f"Ciclo {self.current_cycle} completado. Descanso corto de {self.SHORT_BREAK//60} minutos")
        else:
            # Terminó un descanso
            if self.current_cycle > self.total_cycles:
                # Terminó descanso largo, nueva sesión
                self.current_cycle = 1
                self.session_count += 1
                self.is_break = False
                self.POMODORO_TIME = self.WORK_TIME
                print(f"¡Nueva sesión iniciada! Sesión #{self.session_count + 1}")
            else:
                # Terminó descanso corto, siguiente ciclo de trabajo
                self.current_cycle += 1
                self.is_break = False
                self.POMODORO_TIME = self.WORK_TIME
                print(f"Iniciando ciclo {self.current_cycle} de trabajo")
        
        # Actualizar tiempo y display
        self.time_left = self.POMODORO_TIME
        self.update_display()
        self.update_cycle_display()
        
    def update_cycle_display(self):
        """Actualizar el display del ciclo"""
        cycle_text = self.get_cycle_text()
        self.cycle_label.config(text=cycle_text)
        
        # Cambiar color según el estado
        if self.is_break:
            if self.current_cycle > self.total_cycles:
                # Descanso largo
                self.cycle_label.config(fg=self.COLORS['info'])
            else:
                # Descanso corto
                self.cycle_label.config(fg=self.COLORS['warning'])
        else:
            # Período de trabajo
            self.cycle_label.config(fg=self.COLORS['text_secondary'])
        
    def format_time(self, seconds):
        """Formatear tiempo en MM:SS"""
        minutes = seconds // 60
        seconds = seconds % 60
        return f"{minutes:02d}:{seconds:02d}"
        
    def toggle_timer(self):
        """Iniciar/pausar timer con cambio de ícono"""
        if not self.is_running and not self.is_paused:
            # Iniciar timer: cambiar a ícono de pausa
            self.is_running = True
            self.start_button.config(
                text="⏸", 
                bg=self.COLORS['primary_bg'], 
                fg=self.COLORS['text_primary']
            )  # Ícono pausa
            threading.Thread(target=self.run_timer, daemon=True).start()
            
        elif self.is_running and not self.is_paused:
            # Pausar timer: mantener ícono de play para reanudar
            self.is_paused = True
            self.is_running = False
            self.start_button.config(
                text="▶", 
                bg=self.COLORS['primary_bg'],
                fg=self.COLORS['text_primary']
            )  # Ícono play
            
        elif not self.is_running and self.is_paused:
            # Reanudar timer: cambiar a ícono de pausa
            self.is_paused = False
            self.is_running = True
            self.start_button.config(
                text="⏸", 
                bg=self.COLORS['primary_bg'],
                fg=self.COLORS['text_primary']
            )  # Ícono pausa
            threading.Thread(target=self.run_timer, daemon=True).start()
            
    def reset_timer(self):
        """Reiniciar timer y restaurar ícono inicial"""
        self.is_running = False
        self.is_paused = False
        
        # Resetear a estado inicial del Pomodoro
        self.current_cycle = 1
        self.is_break = False
        self.POMODORO_TIME = self.WORK_TIME
        self.time_left = self.POMODORO_TIME
        
        self.start_button.config(
            text="▶", 
            bg=self.COLORS['primary_bg'],
            fg=self.COLORS['success']
        )  # Ícono play inicial transparente
        self.update_display()
        self.update_cycle_display()
        print("Timer reseteado - Iniciando desde el ciclo 1")
        
    def run_timer(self):
        """Ejecutar cuenta atrás"""
        while self.is_running and self.time_left > 0:
            time.sleep(1)
            if self.is_running:  # Verificar si no se pausó durante el sleep
                self.time_left -= 1
                self.root.after(0, self.update_display)
                
        if self.time_left == 0:
            self.root.after(0, self.timer_finished)
            
    def update_display(self):
        """Actualizar display del tiempo"""
        self.time_label.config(text=self.format_time(self.time_left))
        
        # Cambiar color según el tiempo restante SOLO durante períodos de trabajo
        if not self.is_break:
            # Durante trabajo: aplicar colores de advertencia según tiempo restante
            if self.time_left <= 60:  # Último minuto
                self.time_label.config(fg=self.COLORS['danger'])
            elif self.time_left <= 300:  # Últimos 5 minutos
                self.time_label.config(fg=self.COLORS['warning'])
            else:
                self.time_label.config(fg=self.COLORS['text_primary'])
        else:
            # Durante descansos: mantener siempre color blanco
            self.time_label.config(fg=self.COLORS['text_primary'])
            
        # Actualizar display del ciclo
        self.update_cycle_display()
            
    def timer_finished(self):
        """Acciones cuando termina el timer"""
        self.is_running = False
        self.is_paused = False
        
        # Mostrar mensaje de finalización
        if self.is_break:
            if self.current_cycle > self.total_cycles:
                print("¡Descanso largo terminado! Iniciando nueva sesión automáticamente...")
            else:
                print(f"¡Descanso terminado! Iniciando ciclo {self.current_cycle + 1} automáticamente...")
        else:
            print(f"¡Ciclo {self.current_cycle} completado! Iniciando descanso automáticamente...")
        
        # Avanzar al siguiente ciclo
        self.next_cycle()
        
        # Reproducir sonido de notificación para TODOS los cambios de fase
        self.play_notification_sound()
            
        # Mostrar notificación visual
        self.show_notification()
        
        # Iniciar automáticamente el siguiente período después de la notificación
        self.auto_start_next_period()
        
    def play_notification_sound(self):
        """Reproducir sonido de notificación"""
        if playsound:
            try:
                # Verificar si el archivo existe
                if os.path.exists(SOUND_FILE):
                    print(f"🔊 Reproduciendo: {SOUND_FILE}")
                    playsound(SOUND_FILE, block=False)
                else:
                    print(f"❌ Archivo de sonido no encontrado: {SOUND_FILE}")
                    print('\a')  # Fallback al sonido del sistema
            except Exception as e:
                print(f"❌ Error al reproducir sonido: {e}")
                print('\a')  # Fallback al sonido del sistema
        else:
            print("⚠️ playsound no disponible, usando sonido del sistema")
            print('\a')  # Sonido del sistema
        
    def auto_start_next_period(self):
        """Iniciar automáticamente el siguiente período después de un breve retraso"""
        # Iniciar cuenta regresiva visual de 3 segundos
        self.countdown_seconds = 3
        self.show_countdown()
        
    def start_next_period(self):
        """Iniciar el siguiente período automáticamente"""
        # Mostrar mensaje de inicio automático
        if self.is_break:
            if self.current_cycle > self.total_cycles:
                print("🔄 Iniciando descanso largo automáticamente...")
            else:
                print("🔄 Iniciando descanso corto automáticamente...")
        else:
            print(f"🔄 Iniciando ciclo {self.current_cycle} automáticamente...")
        
        # Configurar botón como corriendo y iniciar timer
        self.is_running = True
        self.start_button.config(
            text="⏸", 
            bg=self.COLORS['primary_bg'],  # Mantener fondo transparente
            fg=self.COLORS['text_primary']
        )
        
        # Iniciar el timer en un hilo separado
        threading.Thread(target=self.run_timer, daemon=True).start()
        
    def show_countdown(self):
        """Mostrar cuenta regresiva visual de 3 segundos"""
        if self.countdown_seconds > 0:
            # Mostrar el número en el display del timer
            original_text = self.time_label.cget('text')
            self.time_label.config(
                text=f"⏰ {self.countdown_seconds}",
                fg=self.COLORS['warning'],
                font=('Arial', 20, 'bold')
            )
            
            self.countdown_seconds -= 1
            # Programar el siguiente segundo de cuenta regresiva
            self.root.after(1000, self.show_countdown)
        else:
            # Restaurar display normal y empezar el siguiente período
            self.time_label.config(
                text=self.format_time(self.time_left),
                fg=self.COLORS['text_primary'],
                font=('Arial', 16, 'bold')
            )
            self.start_next_period()
        
    def show_notification(self):
        """Mostrar notificación visual"""
        # Hacer parpadear la ventana usando after() en lugar de time.sleep()
        self.original_color = self.root.cget('bg')
        self.blink_count = 0
        self.blink_state = 'red'  # Empezar con rojo
        self.blink_notification()
        
    def blink_notification(self):
        """Método recursivo para hacer parpadear la ventana sin bloquear"""
        if self.blink_count >= 6:  # Parar después de 6 cambios (3 parpadeos completos)
            # Restaurar el color original al terminar
            self.root.configure(bg=self.original_color)
            return
            
        if self.blink_state == 'red':
            self.root.configure(bg=self.COLORS['danger'])
            self.blink_state = 'normal'
        else:
            self.root.configure(bg=self.original_color)
            self.blink_state = 'red'
            
        self.blink_count += 1
        # Programar el siguiente cambio después de 200ms
        self.root.after(200, self.blink_notification)
            
    def run(self):
        """Iniciar la aplicación"""
        try:
            self.root.mainloop()
        except KeyboardInterrupt:
            pass

if __name__ == "__main__":
    # Crear y ejecutar la aplicación
    app = PomodoroTimer()
    print("🍅 Técnica Pomodoro iniciada!")
    print("- 4 ciclos de trabajo de 25 minutos")
    print("- Descansos cortos de 5 minutos entre ciclos")
    print("- Descanso largo de 15 minutos después del 4to ciclo")
    print("- 🔄 INICIO AUTOMÁTICO: Cada fase inicia automáticamente")
    print("")
    print("Controles:")
    print("- Ícono ▶ para iniciar la primera vez")
    print("- Ícono ⏸ para pausar en cualquier momento")  
    print("- Ícono ■ para reiniciar al ciclo 1")
    print("- Ícono ⚙ para configurar tiempo de trabajo")
    print("- Ícono ✕ para cerrar la aplicación")
    print("- Arrastra desde la zona '⋮⋮' para mover la ventana")
    print("- El indicador lateral muestra el ciclo actual (ej: 1/4)")
    print("- Ubicación inicial: esquina inferior derecha")
    app.run()