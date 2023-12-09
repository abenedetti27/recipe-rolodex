import React, { useEffect, useState } from 'react';

const PrersonalRecipeCard = ({ recipe, onEdit, onDelete }) => {
    const [isEditing, setisEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setisEditing(false);
    };

    const handleSaveEdit = (updatedRecipe) => {
        onUpdateRecipe(recipe.id, updatedRecipe);
        setIsEditing(false);
    };
