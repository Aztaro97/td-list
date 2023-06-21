import { ITodo } from "@/@types";
import { deleteProject, updateStatus } from "@/store/features/projectReducer";
import { Box, Button, Checkbox, Paper, Stack, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import EditFormModal from "../editFormModal";

interface singleTodoProps {
  index: number;
  todo: ITodo;
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  todosComplete: ITodo[];
  setTodosComplete: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const SingleTodo: FC<singleTodoProps> = ({ todo, index }) => {
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  const onUpdateStatus = () => {
    dispatch(updateStatus(todo));
    setIsComplete(!isComplete);
  };

  useEffect(() => {
    if (todo) {
      setIsComplete(todo.isDone);
    }
  }, [todo]);

  return (
    <>
      <Draggable draggableId={todo._id} index={index}>
        {(provided, snapshot) => (
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Stack
              direction="row"
              py={2}
              px={4}
              bgcolor="#ececec"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography component="h1" variant="h5">
                {todo.title}
              </Typography>
              <Box alignItems="center" gap={1}>
                <Button onClick={() => setShowModal(true)}>Edit</Button>
                <Button
                  color="warning"
                  onClick={() => dispatch(deleteProject(todo._id as string))}
                >
                  delete
                </Button>
                <Checkbox checked={isComplete} onChange={onUpdateStatus} />
              </Box>
            </Stack>
          </Paper>
        )}
      </Draggable>
      <EditFormModal
        setShowModal={setShowModal}
        showModal={showModal}
        todo={todo}
      />
    </>
  );
};

export default SingleTodo;
