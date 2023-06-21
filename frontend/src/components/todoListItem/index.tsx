import { ITodo } from "@/@types";
import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import SingleTodo from "../singleTodo";

interface props {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  todosComplete: ITodo[];
  setTodosComplete: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoListItem: FC<props> = ({
  todos,
  setTodos,
  todosComplete,
  setTodosComplete,
}) => {
  return (
    <Container maxWidth={"lg"}>
      <Grid
        container
        columnSpacing={{ xs: 2 }}
        sx={{
          marginTop: 3,
          marginBottom: 3,
        }}
        height="100%"
        minHeight={"70vh"}
      >
        <Grid item xs={6} bgcolor="#cccccc" py={3} px={2}>
          <Droppable droppableId="todoListActive">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                // className={`w-full flex flex-col gap-5 bg-white rounded-lg px-4 py-5 mt-3 ${
                //   snapshot.isDraggingOver ? "drop-shadow-md" : ""
                // }`}
              >
                <Typography mb={2} component="h1" variant="h5">
                  Active Task
                </Typography>
                <Stack spacing={1}>
                  {todos.map((todo, index) => (
                    <SingleTodo
                      todo={todo}
                      key={index}
                      index={index}
                      setTodos={setTodos}
                      todos={todos}
                      todosComplete={todosComplete}
                      setTodosComplete={setTodosComplete}
                    />
                  ))}
                </Stack>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
        <Grid item xs={6} bgcolor="#cceecc" py={3} px={2}>
          <Droppable droppableId="todoListComplete">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                // className={`w-full flex flex-col gap-5 bg-amber-400 rounded-lg px-4 py-5 mt-3`}
              >
                <Typography mb={2}  component="h1" variant="h5">
                  Complete Task
                </Typography>
                <Stack spacing={1}>
                  {todosComplete.map((todo, index) => (
                    <SingleTodo
                      todo={todo}
                      key={index}
                      index={index}
                      setTodos={setTodos}
                      todos={todos}
                      todosComplete={todosComplete}
                      setTodosComplete={setTodosComplete}
                    />
                  ))}
                </Stack>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TodoListItem;
