import { ITodo } from "@/@types";
import { useAppSelector } from "@/hook/toolkitHook";
import { todoSchema } from "@/schemaValidator";
import { createProject } from "@/store/features/projectReducer";
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
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

type TTodo = z.infer<typeof todoSchema>;

const InputFieldModal: FC<props> = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const { isCreating } = useAppSelector((state) => state.project);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<TTodo>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = (data: TTodo) => {
    if (isValid) {
      dispatch(createProject(data));
      reset();
      setOpenModal(false);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <Dialog onClose={handleClose} open={openModal}>
      <DialogTitle>Create Your Todo List</DialogTitle>
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
            disabled={isCreating}
            onClick={handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </form>
      </Container>
    </Dialog>
  );
};

export default InputFieldModal;
