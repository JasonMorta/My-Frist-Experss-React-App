
# User instructions for testing this API with Postman

This RESTful API allows a user to GET, POST, DELETE and PUT, a list of data.


## Installation

#### Install restful_api with npm.
Got to your vscode terminal and do the following.

```bash
  cd directory
  npm install 
  nmp start
```
    
## Using Postman

#### To **GET** all items
- This will only view all the items in the list.
- In the drop-down, select GET.
- In the address bar enter the following link:

```http
  http://localhost:8080/api

```

#### To **POST** a item to the list
- This allows you to add one item to the list.
- ( Step 1 )In the drop-down, select POST.
- ( Step 2 )In the address bar enter the following link:

```http
  ://localhost:8080/api
```
###

- ( Step 3 )In the params table do the following to add an item to the list.
| KEY***required**|  VALUE      | Description                       |
| :--------     | :-------    | :-------------------------------- |
| `title`       | `string` | |
| `description`       | `string` | |
| `url`       | `string` | |

###

#### To **PUT** a item
- This allows you to edit and update any item in the list.
- To update any item, only the id KEY **required**.
- (Step 1)In the drop-down, select PUT.
- (Step 2)In the address bar enter the following link:

```http
  http://localhost:8080/api

```
- (Step 3)In the params table do the following to update an item.
| KEY ***required**|  VALUE      | Description                       |
| :--------     | :-------    | :-------------------------------- |
| `id`          | `string` | Add the id of the item you want to edit. (KEY **required**) |
| `title`       | `string` | optional |
| `description` | `string` | optional |
| `url`         | `string` | optional |

###

#### To **DELETE** a item
- Delete a item.
- To delete any item, its id is **required**.
- (Step 1)In the drop-down, select DELETE.
- (Step 2)In the address bar enter the following link:

```http
  http://localhost:8080/api

```

- (Step 3)In the params table do the following to delete an item.
| KEY***required**|  VALUE      | Description                       |
| :--------     | :-------    | :-------------------------------- |
| `id`       | `string` |  Add the id of the item you want to delete |




## Preview

[Live Demo](https://wd-project-list.herokuapp.com/)

