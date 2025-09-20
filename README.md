# Lara-React-CRUD

This project is a CRUD (Create, Read, Update, Delete) application built using Laravel for the backend and React for the frontend. Learn how to create this project from https://youtu.be/VdYfBzOFPUQ

## Features
- Create, read, update, and delete records.
- Seamless integration between Laravel and React, Tailwind CSS, and Shadcn/ui.

## Requirements
- PHP >= 8.2 or higher
- Composer
- Node.js >= 14.x
- npm or yarn

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/lara-react-crud.git
    cd lara-react-crud
    ```

2. Install backend dependencies:
    ```bash
    composer install
    ```

3. Set up the `.env` file:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. Configure your database in the `.env` file and run migrations:
    ```bash
    php artisan migrate
    ```

5. Install frontend dependencies:
    ```bash
    npm install
    ```

6. Build the frontend and backend assets and start the development server:
    ```bash
    composer run dev
    ```

## Hosting through cpanel

### Local Preparation
```
# Install dependencies
composer install --optimize-autoloader --no-dev

# Clear and cache configurations
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Generate optimized autoloader
composer dump-autoload --optimize

# Cache configurations for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Updating env
```
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
```

### Upload file to cpanel
1. Login to cPanel
2. Open "File Manager"
3. Navigate to public_html folder
4. Create a temporary folder (e.g., laravel_temp)
5. Upload your entire Laravel project as a ZIP file
6. Extract the ZIP file

### Configure Directory
```
public_html/
├── laravel_app/          # Your Laravel application (except public folder)
├── index.php            # From Laravel's public folder
├── .htaccess            # From Laravel's public folder
├── css/                 # From Laravel's public folder
├── js/                  # From Laravel's public folder
└── other public assets/
```

1. Move everything EXCEPT the `public` folder contents to `public_html/laravel_app/`
2. Move contents of Laravel's `public` folder to `public_html/`
3. Update `index.php` paths:
```
// public_html/index.php
<?php

require __DIR__.'/laravel_app/vendor/autoload.php';

$app = require_once __DIR__.'/laravel_app/bootstrap/app.php';
```

### Database Setup

Create Database
1. In cPanel, go to "MySQL Databases"
2. Create a new database
3. Create a database user
4. Assign user to database with all privileges
5. Note the full database name (usually prefixed with your username)

Import Database (if migrating)
1. Use "phpMyAdmin" in cPanel
2. Select your database
3. Import your SQL dump file

Run Migrations (if needed)
Create a temporary PHP file in `public_html` to run migrations:
```
<?php
// migrate.php - DELETE after use
require __DIR__.'/laravel_app/vendor/autoload.php';

$app = require_once __DIR__.'/laravel_app/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$kernel->call('migrate', ['--force' => true]);
echo "Migrations completed!";
```

### File Permissions

1. Folders: 755
2. Files: 644
3. `storage/` and `bootstrap/cache/`: 775 (recursive)

### Configure .htaccess

Ensure `.htaccess` in `public_html` contains:
```
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

If you moved public contents to root, use Laravel's default `.htaccess`:
```
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

## Usage
- Access the application at `http://localhost:8000`.
- Use the interface to perform CRUD operations.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).
