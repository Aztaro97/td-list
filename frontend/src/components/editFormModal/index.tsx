import { ITodo } from "@/@types";
import { useAppSelector } from "@/hook/toolkitHook";
import { todoSchema } from "@/schemaValidator";
import { updateProject } from "@/store/features/projectReducer";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import FieldErrorMessage from "../fieldErrorMessage";

interface props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  todo: ITodo;
}

type TTodo = z.infer<typeof todoSchema>;

const EditFormModal: FC<props> = ({ showModal, setShowModal, todo }) => {
  const dispatch = useDispatch();
  const { isUpdating } = useAppSelector((state) => state.project);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<TTodo>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description,
    },
  });

  const onSubmit = (data: TTodo) => {
    if (!isValid) return;
    dispatch(
      updateProject({
        ...data,
        _id: todo._id,
        isDone: todo.isDone,
      })
    );
    setShowModal(false);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <Dialog onClose={handleClose} open={showModal}>
      <DialogTitle>Edit</DialogTitle>
      <Container>
        <form>
          <Box
            sx={{
              marginTop: 1,
            }}
          >
            <FieldErrorMessage errors={errors} name="title">
              <Controller
                name={"title"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Enter your task name"
                    name="title"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </FieldErrorMessage>
            <FieldErrorMessage errors={errors} name="description">
              <Controller
                name={"description"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Enter your task description"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </FieldErrorMessage>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isUpdating}
            onClick={handleSubmit(onSubmit)}
          >
            Update
          </Button>
        </form>
      </Container>
    </Dialog>
  );
};

export default EditFormModal;
