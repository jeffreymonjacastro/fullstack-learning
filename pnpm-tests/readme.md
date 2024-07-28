## pnpm

[pnpm](https://pnpm.io/es/pnpm-cli) es un gestor de paquetes que instala los paquetes de forma global, lo que permite que los paquetes compartan dependencias entre sí. Además, pnpm instala los paquetes en un solo lugar, lo que ahorra espacio en disco.

### Comandos básicos

Para instalar pnpm globalmente:

```bash
corepack enable pnpm
```

Para iniciar un proyecto:

```bash
pnpm init
```

Para instalar un paquete:

```bash
pnpm add <package>
```

Para instalar dependencias de desarrollo:

```bash
pnpm add -D <package>
```

Para instalar módulos globalmente

```bash
pnpm add -g <package>
```

Para preparar el ambiente:

```bash
pnpm setup
```

Para instalar en base al package.json:

```bash
pnpm install | pnpm i
```

Para remover un paquete:

```bash
pnpm remove <package>
```

Para ejecutar scripts de una cli, en lugar de utiliza npx:

```bash
# pnpm exec tsc --init
pnpm exec <command>
```

Ejecutar un módulo sin tenerlo instalado globalmente:

```bash
# pnpm dlx create-react-app my-app
pnpm dlx <command>
```

Para ejecutar el comando `create-react-app` con vite:

```bash
pnpm create vite
# Seguir todos los pasos
```

Para cambiar un `package-lock.json` a `pnpm-lock.yaml`:

```bash
pnpm import
```

