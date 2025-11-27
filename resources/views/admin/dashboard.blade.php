<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <h1>Logout</h1>
        <form action="/admin/logout" method="get">
            @csrf
            <button>Logout</button>
        </form>
    </body>
</html>
