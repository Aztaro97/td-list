import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Box, Button, CircularProgress } from "@mui/material";
import { ITodo } from "@/@types";
import InputFieldModal from "@/components/inputFieldModal";
import TodoListItem from "@/components/todoListItem";
import { useDispatch } from "react-redux";
import { getAllProject, updateStatus } from "@/store/features/projectReducer";
import { useAppSelector } from "@/hook/toolkitHook";

const HomeScreen = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [todos, setTodos] = useState<Array<ITodo>>([]);

  const { data, error, isLoading } = useAppSelector((state) => state.project);
  const dispatch = useDispatch();

  const [todosComplete, setTodosComplete] = useState<Array<ITodo>>([]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add: any;
    const active = todos;
    const complete = todosComplete;
    // Source Logic
    if (source.droppableId === "todoListActive") {
      add = active[source.index];
      active.splice(source.index, 1);
      console.log("move to complete", add);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
      console.log("move to uncomplete", add);
    }

    // Destination Logic
    if (destination.droppableId === "todoListActive") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setTodosComplete(complete);
    setTodos(active);
  };

  useEffect(() => {
    dispatch(getAllProject());
    ``;
  }, [dispatch]);

  //   Filter the data by split to todos and completetodo when component umount
  useEffect(() => {
    if (data.length) {
      const todos = data.filter((todo) => todo.isDone === false);
      const completeTodos = data.filter((todo) => todo.isDone === true);
      setTodos(todos);
      setTodosComplete(completeTodos);
    }
  }, [data]);

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          display={"flex"}
          justifyContent="center"
          mt={4}
          mb={2}
          alignItems={"center"}
        >
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Create new Item
          </Button>
        </Box>
        {isLoading ? (
          <Box
            width={"100%"}
            height="100%"
            alignItems={"center"}
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          <TodoListItem
            setTodos={setTodos}
            todos={todos}
            todosComplete={todosComplete}
            setTodosComplete={setTodosComplete}
          />
        )}
      </DragDropContext>
      <InputFieldModal setOpenModal={setOpenModal} openModal={openModal} />
    </>
  );
};

export default HomeScreen;
