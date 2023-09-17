"use client";
import {
    Stack,
    TextField,
    Button,
    Typography,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    Select,
    CircularProgress,
    MenuItem,
} from "@mui/material";
import { useContext, useState } from "react";
import ky from "ky";
import { UserContext } from "@/app/context";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";

export const adaptationOptions = [
    "Acortar ejercicio",
    "Simplificar ejercicio",
    "Seleccion multiple",
];

export const disciplinaOptions = ["Matematica", "Lengua", "Ciencia"];

export default function NewExercise() {
    const router = useRouter();
    const userId = JSON.parse(localStorage.getItem("userData")).Id;
    const [isLoading, setIsLoading] = useState(false);

    // States for input values
    const [titulo, setTitulo] = useState("");
    const [idioma, setIdioma] = useState("");
    const [edadAlumnos, setEdadAlumnos] = useState("");
    const [consigna, setConsigna] = useState("");
    const [texto, setTexto] = useState("");
    const [ejercicio, setEjercicio] = useState("");
    const [selectedAdaptations, setSelectedAdaptations] = useState([]);
    const [disciplina, setDisciplina] = useState("");

    const [exerciseList, setExerciseList] = useState([]);

    const handleDisciplinaChange = (event) => {
        setDisciplina(event.target.value);
    };

    const handleAdaptationChange = (event) => {
        const value = event.target.value;
        if (selectedAdaptations.includes(value)) {
            setSelectedAdaptations((prevSelected) =>
                prevSelected.filter((adaptation) => adaptation !== value)
            );
        } else {
            setSelectedAdaptations((prevSelected) => [...prevSelected, value]);
        }
    };
    const handleDeleteExercise = (index) => {
        const updatedExerciseList = exerciseList.filter(
            (exercise, i) => i !== index
        );
        setExerciseList(updatedExerciseList);
    };

    // Handler for adding exercises
    const handleAddExercise = () => {
        if (
            !disciplina ||
            selectedAdaptations.length === 0 ||
            !consigna ||
            !ejercicio
        ) {
            return;
        }
        setExerciseList((prevList) => [
            ...prevList,
            {
                disciplina,
                consigna,
                texto,
                ejercicio,
                selectedAdaptations,
            },
        ]);

        setDisciplina("");
        setConsigna("");
        setTexto("");
        setEjercicio("");
        setSelectedAdaptations([]);
    };

    const isAddExerciseEnabled =
        selectedAdaptations.length > 0 && consigna && ejercicio && disciplina;
    const isCreateExercitacionEnabled =
        exerciseList.length > 0 && titulo && idioma && edadAlumnos;

    // Crear ejercitación
    const handleCreateExercitacion = async () => {
        if (exerciseList.length === 0 || !titulo || !idioma || !edadAlumnos) {
            return;
        }

        setIsLoading(true); // Activar el indicador de carga

        const ejercitacion = {
            titulo,
            edad: parseInt(edadAlumnos),
            idioma,
            ejercicios: exerciseList,
        };

        try {
            const response = await ky.post(
                `https://localhost:7261/api/v1/Ejercicio/adaptar-ejercicio/${userId}`,
                {
                    json: ejercitacion,
                    timeout: 300000,
                }
            );
            const responseBody = await response.json();
            console.log("RESPONSE EJERCICIO ADAPTADO: ", responseBody);
            router.replace(`my-exercises/${responseBody.id}`);
        } catch (error) {
            console.error("Error creating exercise:", error);
        } finally {
            setIsLoading(false); // Desactivar el indicador de carga
        }
    };

    return (
        <Stack spacing={3} width="90%" display="flex" pt="5%" pb="5%">
            <Typography
                width="100%"
                variant="h4"
                color="black"
                fontWeight={700}
                fontSize="50px"
            >
                <span style={{ color: "grey" }}>Crear</span> nueva ejercitación
            </Typography>
            <Typography
                width="100%"
                variant="h4"
                color="black"
                fontWeight={700}
                fontSize="25px"
            >
                Indique el{" "}
                <span style={{ color: "grey" }}>titulo, idioma y edad</span> de
                la ejercitacion
            </Typography>

            <TextField
                label="Titulo"
                variant="outlined"
                name="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />
            <Stack direction="row" spacing={5} sx={{ width: "100%" }}>
                <TextField
                    label="Idioma"
                    variant="outlined"
                    name="idioma"
                    type="text"
                    sx={{ width: "50%" }}
                    value={idioma}
                    onChange={(e) => setIdioma(e.target.value)}
                />
                <TextField
                    label="Edad de los alumnos"
                    variant="outlined"
                    name="edadAlumnos"
                    type="number"
                    sx={{ width: "50%" }}
                    value={edadAlumnos}
                    onChange={(e) => setEdadAlumnos(e.target.value)}
                />
            </Stack>

            <Divider />

            <Typography
                width="100%"
                variant="h4"
                color="black"
                fontWeight={700}
                fontSize="40px"
            >
                <span style={{ color: "grey" }}>Agregar</span> ejercicio
            </Typography>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    Disciplina
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={undefined}
                    label="Disciplina"
                    onChange={handleDisciplinaChange}
                >
                    {disciplinaOptions.map((disciplina) => (
                        <MenuItem value={disciplina}>{disciplina}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Consigna"
                variant="outlined"
                name="consigna"
                value={consigna}
                onChange={(e) => setConsigna(e.target.value)}
            />
            <TextField
                label="Texto"
                variant="outlined"
                name="texto"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                multiline
            />
            <TextField
                label="Ejercicio"
                variant="outlined"
                name="ejercicio"
                multiline
                value={ejercicio}
                onChange={(e) => setEjercicio(e.target.value)}
            />
            <Stack direction="row" spacing={1}>
                <Typography fontWeight={700} color="grey">
                    Tipos de Adaptaciones:
                </Typography>
                {adaptationOptions.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                value={option}
                                checked={selectedAdaptations.includes(option)}
                                onChange={handleAdaptationChange}
                            />
                        }
                        label={option}
                    />
                ))}
            </Stack>

            <Button
                className="loginButton"
                variant="outlined"
                color="secondary"
                onClick={handleAddExercise}
                disabled={!isAddExerciseEnabled}
                style={{
                    boxShadow: isAddExerciseEnabled
                        ? "0px 0px 10px 5px #4CAF50"
                        : "none",
                    backgroundColor: "#F2CC59",
                }}
            >
                <Typography fontWeight={700} color="grey">
                    Agregar ejercicio
                </Typography>
            </Button>
            <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Disciplina</b>
                            </TableCell>
                            <TableCell>
                                <b>Consigna</b>
                            </TableCell>
                            <TableCell>
                                <b>Adaptación/es</b>
                            </TableCell>
                            <TableCell></TableCell>
                            {/* Add an empty cell for the delete button */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exerciseList.map((exercise, index) => (
                            <TableRow
                                key={index}
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: "white",
                                    transition: "background-color 0.3s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "#F2CC59";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "white";
                                }}
                            >
                                <TableCell>{exercise.disciplina}</TableCell>
                                <TableCell>{exercise.consigna}</TableCell>
                                <TableCell>
                                    {exercise.selectedAdaptations.map(
                                        (adaptation) => `${adaptation} |`
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="text"
                                        color="secondary"
                                        onClick={() =>
                                            handleDeleteExercise(index)
                                        } // Handle exercise deletion
                                    >
                                        <DeleteIcon style={{ color: "red" }} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider />

            <Button
                className="loginButton"
                variant="outlined"
                onClick={handleCreateExercitacion}
                disabled={!isCreateExercitacionEnabled}
                style={{
                    boxShadow: isCreateExercitacionEnabled
                        ? "0px 0px 10px 5px #4CAF50"
                        : "none",
                    backgroundColor: "#F2CC59",
                }}
            >
                {isLoading ? ( // Mostrar el icono de carga si isLoading es true
                    <CircularProgress size={24} color="secondary" />
                ) : (
                    <Typography fontWeight={700} color="grey">
                        Crear ejercitación
                    </Typography>
                )}
            </Button>
        </Stack>
    );
}
