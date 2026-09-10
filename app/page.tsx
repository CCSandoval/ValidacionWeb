"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Backdrop } from "@mui/material";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CloseIcon from "@mui/icons-material/Close";

const baseInputStyle =
  "border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#034aa6] focus:border-[#034aa6]";
const baseButtonStyle =
  "px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#034aa6] focus:ring-offset-2";

interface FormData {
  name: string;
  code: number;
  type: "certificates" | "validation" | "information" | "assistance";
  description: string;
}

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setShowSuccess(true);
  };

  return (
    <>
      {showSuccess && (
        <Backdrop component={"div"} open={showSuccess} className="z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative flex flex-col">
            <CloseIcon
              className="absolute top-0 right-0 m-2 cursor-pointer"
              onClick={() => setShowSuccess(false)}
            />
            <h2 className="text-2xl font-bold mb-4">¡Solicitud enviada!</h2>
            <p className="mb-4">
              Tu solicitud de ha sido envíada, en breves te contactaremos para
              darte solución
            </p>
            <button
              className={`${baseButtonStyle} w-fit bg-[#034aa6] text-white ml-auto`}
              onClick={() => {
                reset()
                setShowSuccess(false);
              }}
            >
              Cerrar
            </button>
          </div>
        </Backdrop>
      )}
      <div className="bg-white flex flex-col rounded-3xl shadow-[rgba(0,0,0,0.25)] shadow-lg w-full max-w-lg min-h-[80dvh] m-auto p-8 h-fit">
        <h1 className="text-2xl flex font-bold items-center mb-5">
          <ArchiveOutlinedIcon fontSize="large" />
          Registro de solicitudes
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <FieldLabel label="Nombre">
            <input
              className={`${baseInputStyle}`}
              placeholder="Cristian Sandoval"
              {...register("name", {
                required: "El nombre es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
              })}
            />
            {formState.errors.name && (
              <p className="text-red-500">{formState.errors.name.message}</p>
            )}
          </FieldLabel>
          <FieldLabel label="Código Institucional">
            <input
              className={`${baseInputStyle}`}
              type="number"
              placeholder="843734"
              {...register("code", {
                required: "El código es requerido",
                minLength: {
                  value: 6,
                  message: "El código debe tener al menos 6 dígitos",
                },
                maxLength: {
                  value: 6,
                  message: "El código debe tener máximo 6 dígitos",
                },
                pattern: {
                  value: /^[0-9]{6}$/,
                  message:
                    "El código debe ser un número de 6 dígitos sin letras o caracteres especiales",
                },
              })}
            />
            {formState.errors.code && (
              <p className="text-red-500">{formState.errors.code.message}</p>
            )}
          </FieldLabel>
          <FieldLabel label="Tipo de solicitud">
            <select
              className={`${baseInputStyle}`}
              {...register("type", {
                required: "El tipo de solicitud es requerido",
              })}
            >
              <option value="" disabled selected>
                Seleccione
              </option>
              <option value="certificates">Documentos y certificados</option>
              <option value="validation">Validación de cursos</option>
              <option value="information">Información</option>
              <option value="assistance">Asistencia</option>
            </select>
            {formState.errors.type && (
              <p className="text-red-500">{formState.errors.type.message}</p>
            )}
          </FieldLabel>
          <FieldLabel label="Descripción">
            <textarea
              className={`${baseInputStyle}`}
              rows={4}
              {...register("description", {
                required: "La descripción es requerida",
                minLength: {
                  value: 10,
                  message: "La descripción debe tener al menos 10 caracteres",
                },
                maxLength: {
                  value: 500,
                  message: "La descripción debe tener máximo 500 caracteres",
                },
              })}
            />
            {formState.errors.description && (
              <p className="text-red-500">
                {formState.errors.description.message}
              </p>
            )}
          </FieldLabel>

          <div className="flex justify-end gap-2">
            <button type="button" className={`${baseButtonStyle} w-full`}>
              Cancelar
            </button>
            <button
              disabled={!formState.isValid || formState.isSubmitting}
              className={`${baseButtonStyle} w-full bg-[#034aa6] text-white disabled:opacity-50`}
            >
              Envíar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

const FieldLabel = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <label htmlFor="name" className="flex flex-col gap-2 mb-4">
      <p>{label}</p>
      {children}
    </label>
  );
};
