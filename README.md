# Ranking Fulbito

Aplicación para mostrar tabla de posiciones e historial de partidos

![image](https://github.com/user-attachments/assets/2c1cb11a-45bf-4c03-8bec-d680c4aab090)

## Variables de entorno

Para indicar la parametrización de cuantos puntos vale el triunfo, derrota y empate
```
POINTS_WIN=4
POINTS_LOSS=1
POINTS_DRAW=2
```

Para la ruta del documento de google sheet que sirve de repositorio de datos
```
GOOGLE_SHEET_PATH=https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxxx?output=tsv
```

### Script de revalidacion
```
function revalidationPage() {
  UrlFetchApp.fetch('https://paddle-table.vercel.app/api/revalidate')
}
```

## Ingreso de datos

Los datos se ingresan desde el Google Sheet paddle-table (pedir acceso a pabloj.pedraza@gmail.com)

### Nuevos jugadores

Para agregar nuevos juadores al torneo, ir al tab Jugadores y agregarlos uno debajo del otro en la columna A

![image](https://github.com/user-attachments/assets/d929d5ad-3475-4a30-bdc9-d41e4fc9ddeb)

### Nuevo partido

Para agregar nueva fecha agregar un nuevo registro en el tab "historial 2024"

![image](https://github.com/user-attachments/assets/66caa966-2b76-4faa-8436-c028d2eca399)

Hasta que el nuevo registro no tenga la cantidad de goles de cada equipo, el mismo no se refleja en la app
