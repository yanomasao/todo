use axum::http::Request;
use axum::routing::{get, post};
use axum::Router;
use sea_orm::entity::prelude::*;

use axum::{
    extract::{Extension, Path /* Form, Query */},
    http::StatusCode,
    response::IntoResponse,
    Json,
};

use crate::entity::todo::Model;
use crate::repository::todo_repository::TodoRepository;

pub fn add_route(router: Router, prefix: &str) -> Router {
    router
        .route(&(prefix.to_string() + ""), get(list_all))
        .route(&(prefix.to_string() + ""), post(create)) // Add this line
                                                         // .route(
                                                         //     &(prefix.to_string() + "/search/active/:search_word"),
                                                         //     get(search),
                                                         // )
}

pub async fn create(
    // mut req: Request<()>,
    Extension(ref conn): Extension<DatabaseConnection>,
    Json(todo): Json<Model>,
) -> Result<impl IntoResponse, StatusCode> {
    println!("{:?}", &todo);
    // let todo: Model = req.body_json().await?;
    // let conn = req.ext::<DatabaseConnection>().unwrap();
    TodoRepository::create(&conn, &todo).await.unwrap();
    // TodoRepository::create(&conn, &todo).await.unwrap();
    // Ok(StatusCode::Created.into())
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
