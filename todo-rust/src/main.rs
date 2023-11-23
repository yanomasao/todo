// use axum::{handler::get, Router};
use axum::{Router, routing::get};

#[tokio::main]
async fn main() {
    // ルートを作成
    let app = Router::new().route("/", get(|| async { "Hello, World!" }));

    // サーバーを起動
    axum::Server::bind(&"0.0.0.0:9121".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}