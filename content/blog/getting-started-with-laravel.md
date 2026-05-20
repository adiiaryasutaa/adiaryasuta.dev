---
title: "Getting Started with Laravel for Backend Development"
description: "My experience picking up Laravel as a PHP framework — covering routing, Eloquent ORM, and building a simple REST API from scratch."
tags: ["Laravel", "PHP", "Backend"]
date: "2026-01-05"
---

## Why Laravel?

Laravel is the most popular PHP framework for good reason — it ships with everything you need: routing, ORM, queues, authentication, and more, all with an expressive API.

```bash
composer create-project laravel/laravel my-api
cd my-api
php artisan serve
```

## Defining Routes

Routes live in `routes/api.php` for API endpoints:

```php
use App\Http\Controllers\PostController;

Route::apiResource('posts', PostController::class);
```

`apiResource` generates these routes automatically:

| Method | URI             | Action  |
| ------ | --------------- | ------- |
| GET    | `/posts`        | index   |
| POST   | `/posts`        | store   |
| GET    | `/posts/{post}` | show    |
| PUT    | `/posts/{post}` | update  |
| DELETE | `/posts/{post}` | destroy |

## Creating a Model and Migration

```bash
php artisan make:model Post -m
```

The `-m` flag generates a migration alongside the model. Open the migration:

```php
public function up(): void
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('body');
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        $table->timestamps();
    });
}
```

Run it:

```bash
php artisan migrate
```

## Eloquent Relationships

Define relationships directly on the model:

```php
// app/Models/Post.php
class Post extends Model
{
    protected $fillable = ['title', 'body', 'user_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
```

## Building the Controller

```php
// app/Http/Controllers/PostController.php
class PostController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = Post::with('user')->latest()->paginate(15);

        return response()->json($posts);
    }

    public function store(StorePostRequest $request): JsonResponse
    {
        $post = Post::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);

        return response()->json($post, 201);
    }

    public function destroy(Post $post): JsonResponse
    {
        $this->authorize('delete', $post);
        $post->delete();

        return response()->json(null, 204);
    }
}
```

## Form Request Validation

Never validate in the controller. Use Form Requests:

```bash
php artisan make:request StorePostRequest
```

```php
class StorePostRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'body'  => ['required', 'string'],
        ];
    }
}
```

> Laravel automatically returns a `422 Unprocessable Entity` response with validation errors if the request fails — no extra code needed.

That's the core of a Laravel REST API. From here you can layer on authentication with Sanctum, caching with Redis, and background jobs with queues.
