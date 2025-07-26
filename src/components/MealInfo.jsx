import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MealInfo = () => {
    const { mealid } = useParams();
    const [info, setInfo] = useState(null);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
                const jsonData = await response.json();
                if (jsonData.meals && jsonData.meals.length > 0) {
                    setInfo(jsonData.meals[0]);
                } else {
                    setInfo(null);
                }
            } catch (error) {
                console.error("Error fetching meal info:", error);
                setInfo(null);
            }
        };

        getInfo();
    }, [mealid]);

    return (
        <div>
            {!info ? (
                "Data Not Found"
            ) : (
                <div className='mealInfo'>
                    <div className="image-container">
                        <img src={info.strMealThumb} alt={info.strMeal} />
                    </div>
                    <div className='info'>
                        <h1>Recipe Detail</h1>
                        <button>{info.strMeal}</button>
                        <h3>Ingredients:</h3>
                        <p>
                            {Array.from({ length: 20 }, (_, i) => {
                                const ingredient = info[`strIngredient${i + 1}`];
                                const measure = info[`strMeasure${i + 1}`];
                                return ingredient && ingredient.trim() ? `${measure} ${ingredient}`.trim() : null;
                            })
                                .filter(Boolean)
                                .join(', ')}
                        </p>

                        <h3>Instructions</h3>
                        <p><ul>
                            {info.strInstructions
                                .split('.')
                                .filter(instruction => instruction.trim() !== '')
                                .map((instruction, index) => (
                                    <li key={index}>{instruction.trim()}.</li>
                                ))}
                        </ul>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealInfo;
