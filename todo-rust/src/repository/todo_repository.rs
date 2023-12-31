use crate::entity::todo::{self, Model};
use sea_orm::*;

#[derive(Debug, Clone)]
pub struct TodoRepository {}
use chrono::Utc;

impl TodoRepository {
    pub async fn create(conn: &DatabaseConnection, todo: &Model) -> Result<(), DbErr> {
        println!("{:?}", &todo);
        let active_model = todo::ActiveModel {
            title: Set(todo.title.clone()),
            description: Set(todo.description.clone()),
            status: Set("pending".to_string()),
            active_flg: Set(todo.active_flg),
            created_by: Set("system".to_string()),
            ..Default::default()
        };
        active_model.save(conn).await?;
        Ok(())
    }

    pub async fn update(conn: &DatabaseConnection, todo: &Model) -> Result<(), DbErr> {
        println!("{:?}", &todo);
        let active_model = todo::ActiveModel {
            id: Set(todo.id),
            title: Set(todo.title.clone()),
            description: Set(todo.description.clone()),
            status: Set("pending".to_string()),
            active_flg: Set(todo.active_flg),
            created_by: Set("system".to_string()),
            updated_by: Set(Some("system".to_string())),
            updated_at: Set(Some(Utc::now().fixed_offset())),
            // updated_at: Set(None),
            ..Default::default()
        };
        active_model.save(conn).await?;

        Ok(())
    }

    pub async fn list_all(conn: &DatabaseConnection) -> Result<Vec<todo::Model>, DbErr> {
        todo::Entity::find()
            // .filter(menu::Column::ActiveFlg.eq(true))
            .order_by(todo::Column::UpdatedAt, sea_orm::Order::Desc) // Order by created_at in descending order
            .all(conn)
            .await
    }

    // pub async fn search(
    //     conn: &DatabaseConnection,
    //     search_word: String,
    // ) -> Result<Vec<todo::Model>, DbErr> {
    //     todo::Entity::find()
    //         .filter(
    //             Condition::all()
    //                 .add(todo::Column::ActiveFlg.eq(true))
    //                 .add(todo::Column::MenuName.contains(&search_word)),
    //         )
    //         .all(conn)
    //         .await
    // }
}

// #[cfg(test)]
// mod test_db {
//     use super::*;
//     use dotenv::dotenv;
//     use std::env;

//     #[tokio::test]
//     async fn test_all() {
//         dotenv().ok();

//         let database_url = &env::var("DATABASE_URL").expect("undefined [DATABASE_URL]");
//         tracing::debug!("start connect database...");
//         let conn = Database::connect(database_url).await.unwrap();
//         let repo = MenuRepository::new(conn);
//         let rows = repo.all();
//         // println!("{:?}", rows);
//     }
// }

// #[async_trait]
// pub trait TodoRepository: Clone + std::marker::Send + std::marker::Sync + 'static {
//     async fn all(&self) -> anyhow::Result<Vec<Menu>>;
// }

// #[async_trait]
// impl TodoRepository for TodoRepositoryForDb {
//     async fn create(&self, payload: CreateTodo) -> anyhow::Result<Todo> {
//         let todo = sqlx::query_as::<_, Todo>(
//             r#"
// insert into todos (text, completed)
// values ($1, false)
// returning *
//             "#,
//         )
//         .bind(payload.text.clone())
//         .fetch_one(&self.pool)
//         .await?;
//         Ok(todo)
//     }
//     async fn find(&self, id: i32) -> anyhow::Result<Todo> {
//         let todo = sqlx::query_as::<_, Todo>(
//             r#"
// select * from todos where id = $1
//             "#,
//         )
//         .bind(id)
//         .fetch_one(&self.pool)
//         .await
//         .map_err(|e| match e {
//             sqlx::Error::RowNotFound => RepositoryError::NotFound(id),
//             _ => RepositoryError::Unexpected(e.to_string())
//         })?;
//         Ok(todo)
//     }
//     async fn all(&self) -> anyhow::Result<Vec<Todo>> {
//         let todos = sqlx::query_as::<_, Todo>(
//             r#"
// select * from todos order by id desc
//             "#,
//         )
//         .fetch_all(&self.pool)
//         .await?;
//         Ok(todos)
//     }
//     async fn update(&self, id: i32, payload: UpdateTodo) -> anyhow::Result<Todo> {
//         let old_todo = self.find(id).await?;
//         let todo = sqlx::query_as::<_, Todo>(
//             r#"
// update todos set text=$1, completed=$2 where id=$3 returning *
//             "#,
//         )
//         .bind(payload.text.unwrap_or(old_todo.text))
//         .bind(payload.completed.unwrap_or(old_todo.completed))
//         .bind(id)
//         .fetch_one(&self.pool)
//         .await?;
//         Ok(todo)
//     }
//     async fn delete(&self, id: i32) -> anyhow::Result<()> {
//         sqlx::query(
//             r#"
// delete from todos where id=$1
//             "#,
//         )
//         .bind(id)
//         .execute(&self.pool)
//         .await
//         .map_err(|e| match e {
//             sqlx::Error::RowNotFound => RepositoryError::NotFound(id),
//             _ => RepositoryError::Unexpected(e.to_string()),
//         })?;
//         Ok(())
//     }
// }
