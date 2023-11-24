use axum::routing::{get, post};
use axum::Router;
use sea_orm::entity::prelude::*;

use axum::{extract::Extension, http::StatusCode, response::IntoResponse, Json};

use crate::entity::todo::Model;
use crate::repository::todo_repository::TodoRepository;

pub fn add_route(router: Router, prefix: &str) -> Router {
    router
        .route(&(prefix.to_string() + ""), get(list_all))
        .route(&(prefix.to_string() + ""), post(upsert))
}

pub async fn upsert(
    Extension(ref conn): Extension<DatabaseConnection>,
    Json(todo): Json<Model>,
) -> Result<impl IntoResponse, StatusCode> {
    println!("{:?}", &todo);
    match todo.id {
        0 => {
            println!("create");
            TodoRepository::create(&conn, &todo).await.unwrap();
        }
        _ => {
            println!("update");
            TodoRepository::update(&conn, &todo).await.unwrap();
        }
    }
    Ok(StatusCode::OK)
}

pub async fn list_all(
    Extension(ref conn): Extension<DatabaseConnection>,
) -> Result<impl IntoResponse, StatusCode> {
    let rows = TodoRepository::list_all(conn).await.unwrap();
    // println!("{:?}", &rows);
    Ok((StatusCode::OK, Json(rows)))
}

// pub async fn search(
//     Path(search_word): Path<String>,
//     Extension(ref conn): Extension<DatabaseConnection>,
// ) -> Result<impl IntoResponse, StatusCode> {
//     let rows = MenuRepository::search(conn, search_word).await.unwrap();
//     println!("{:?}", rows);
//     Ok((StatusCode::OK, Json(rows)))
// }
