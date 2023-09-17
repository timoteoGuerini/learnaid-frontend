import { useState } from "react";

const Rating = ({ initialValue, onSave }) => {
    const [rating, setRating] = useState(initialValue);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        onSave(newRating); // Llamar a la función onSave con la nueva puntuación
    };

    return (
        <div>
            <span>Calificación:</span>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <button
                    key={value}
                    className={value === rating ? "selected" : ""}
                    onClick={() => handleRatingChange(value)}
                >
                    {value}
                </button>
            ))}
        </div>
    );
};

export default Rating;
