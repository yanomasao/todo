use axum::{routing::get, Router, Extension, response::IntoResponse, http::StatusCode};
use sea_orm::{Database, EntityTrait, DatabaseConnection};
use tower::ServiceBuilder;
// use crate::entity::todo; // Add this import statement
// use axum::service::{ServiceBuilder, ServiceExt};
mod entity;
mod handler;
use handler::*;
mod repository;

#[tokio::main]
async fn main() {
    let conn = Database::connect("postgres://postgres:secret@host.docker.internal:9122/todo").await.unwrap();
    // let conn: DatabaseConnection = Database::connect(db).await.unwrap();
    // let todo = todo::Entity::find_by_id(1).one(&db).await.unwrap();

    // ルートを作成
    // let app = Router::new()
    //     .route("/", get(|| async { "Hello, World!" }))
    //     .route("/api/hello", get(|| async { "Hello, API!" }))
    //     .route("/api/todo", get(|| {
    //         async { todo.unwrap().title.clone() }
    //     }));
    let app = create_app(conn);

    // サーバーを起動
    axum::Server::bind(&"0.0.0.0:9121".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

fn create_app(conn: DatabaseConnection) -> Router {
    let router = Router::new();
    let router = todo_handler::add_route(router, "/api/todo");
    // let router = orderstop_handler::add_route(router, "/api/orderstop");
    router
        .route("/", get(root))
        // .layer(
        //     CorsLayer::new()
        //         .allow_origin(Origin::exact("http://localhost:3001".parse().unwrap()))
        //         .allow_methods(Any)
        //         .allow_headers(vec![CONTENT_TYPE]),
        // )
        .layer(ServiceBuilder::new().layer(Extension(conn)))
}

async fn root() -> Result<impl IntoResponse, StatusCode> {
    Ok((StatusCode::OK, String::from("Hello, rust!")))
}
