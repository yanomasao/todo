use axum::{http::StatusCode, response::IntoResponse, routing::get, Extension, Router};
use sea_orm::{Database, DatabaseConnection};
use tower::ServiceBuilder;
mod entity;
mod handler;
use handler::*;
mod repository;

#[tokio::main]
async fn main() {
    let conn = Database::connect("postgres://postgres:secret@host.docker.internal:9122/todo")
        .await
        .unwrap();

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
