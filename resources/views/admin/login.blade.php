<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <h1>Login</h1>
        <form action="/admin/login" method="post">
            @csrf
            <div>
                <label for="username">Username</label>
                <input id="username" name="username" required>
            </div>
            <div>
                <label for="password">Password</label>
                <input id="password" name="password" type="password" required>
            </div>
            <button>Login</button>
        </form>
    </body>
</html>
