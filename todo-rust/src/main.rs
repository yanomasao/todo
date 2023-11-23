use axum::{routing::get, Router};
use sea_orm::{Database, EntityTrait};
use crate::entity::todo; // Add this import statement
mod entity;

#[tokio::main]
async fn main() {
    let db = Database::connect("postgres://postgres:secret@host.docker.internal:9122/todo").await.unwrap();
    let todo = todo::Entity::find_by_id(1).one(&db).await.unwrap();

    // ルートを作成
    let app = Router::new()
        .route("/", get(|| async { "Hello, World!" }))
        .route("/api/hello", get(|| async { "Hello, API!" }))
        .route("/api/todo", get(|| {
            async { todo.unwrap().title.clone() }
        }));

    // サーバーを起動
    axum::Server::bind(&"0.0.0.0:9121".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();


}
