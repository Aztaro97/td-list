import React, { FC } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Box, Typography } from "@mui/material";

interface props {
  children: React.ReactNode;
  name: string;
  errors: any;
}

const FieldErrorMessage: FC<props> = ({ children, name, errors }) => {
  return (
    <Box width={"100%"}>
      {children}
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }: { message: string }) => (
          <Typography color={"red"} mt={-1}>
            {message}
          </Typography>
        )}
      />
    </Box>
  );
};

export default FieldErrorMessage;
