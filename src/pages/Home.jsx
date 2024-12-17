import { useEffect, useState } from "react";

export default function Home() {
  const [formations, setFormations] = useState([]); // Liste des formations
  const [selectedFormation, setSelectedFormation] = useState(null); // Formation sélectionnée
  const [loading, setLoading] = useState(true); // Chargement des données
  const [error, setError] = useState(null); // Erreurs
  const [updatedFormation, setUpdatedFormation] = useState({
    nomFormation: "",
    thematiqueFormation: "",
    prixFormation: "",
    nbMaxUtilisations: "",
  }); // Pour la modification

  // Fonction pour récupérer toutes les formations
  const fetchFormations = async () => {
    try {
      const response = await fetch("https://backendplateforme2.onrender.com/");
      if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
      const data = await response.json();
      setFormations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer une formation
  const deleteFormation = async (id) => {
    try {
      const response = await fetch(
        `https://backendplateforme2.onrender.com/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error(`Erreur lors de la suppression.`);
      setFormations(formations.filter((formation) => formation._id !== id));
      setSelectedFormation(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fonction pour mettre à jour une formation
  const updateFormation = async () => {
    try {
      const response = await fetch(
        `https://backendplateforme2.onrender.com/${selectedFormation._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormation),
        }
      );
      if (!response.ok) throw new Error("Erreur lors de la mise à jour.");
      const updatedData = await response.json();
      setFormations((prevFormations) =>
        prevFormations.map((formation) =>
          formation._id === updatedData._id ? updatedData : formation
        )
      );
      setSelectedFormation(updatedData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchFormations();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        Mes Formations
      </h1>

      {/* Liste des formations */}
      {!selectedFormation && (
        <>
          {loading && <p>Chargement des formations...</p>}
          {error && <p className="text-red-500">Erreur : {error}</p>}

          {!loading && formations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formations.map((formation) => (
                <div
                  key={formation._id}
                  className="p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 transition-all"
                  onClick={() => setSelectedFormation(formation)}
                >
                  <img
                    src={
                      formation.imageUrl ||
                      "https://via.placeholder.com/300x200?text=Formation"
                    }
                    alt={formation.nomFormation}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h2 className="text-2xl font-semibold mt-4">
                    {formation.nomFormation}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Thématique : {formation.thematiqueFormation}
                  </p>
                  <p className="text-gray-500 mt-1">
                    Date de Création :{" "}
                    {new Date(formation.dateCreation).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 mt-1">
                    Date d'Ajout :{" "}
                    {new Date(formation.dateAjout).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
          {!loading && formations.length === 0 && (
            <p>Aucune formation disponible pour le moment.</p>
          )}
        </>
      )}

      {/* Détails d'une formation sélectionnée */}
      {selectedFormation && (
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <button
            onClick={() => setSelectedFormation(null)}
            className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Retour
          </button>

          {/* Image de la formation */}
          <img
            src={
              selectedFormation.imageUrl ||
              "https://via.placeholder.com/600x300?text=Formation"
            }
            alt={selectedFormation.nomFormation}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />

          <h2 className="text-3xl font-bold mb-4 text-blue-600">
            {selectedFormation.nomFormation}
          </h2>

          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Thématique :</span>{" "}
            {selectedFormation.thematiqueFormation}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Date de Création :</span>{" "}
            {new Date(selectedFormation.dateCreation).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Date d'Ajout :</span>{" "}
            {new Date(selectedFormation.dateAjout).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Date de Modification :</span>{" "}
            {selectedFormation.dateModified
              ? new Date(selectedFormation.dateModified).toLocaleDateString()
              : "Jamais modifié"}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Prix :</span>{" "}
            {selectedFormation.prixFormation} FCFA
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Nombre Max d'Utilisations :</span>{" "}
            {selectedFormation.nbMaxUtilisations}
          </p>

          {/* Formulaire de modification */}
          <div className="mt-4">
            <input
              type="text"
              value={updatedFormation.nomFormation}
              onChange={(e) =>
                setUpdatedFormation({
                  ...updatedFormation,
                  nomFormation: e.target.value,
                })
              }
              placeholder="Modifier le nom"
              className="mb-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={updatedFormation.thematiqueFormation}
              onChange={(e) =>
                setUpdatedFormation({
                  ...updatedFormation,
                  thematiqueFormation: e.target.value,
                })
              }
              placeholder="Modifier la thématique"
              className="mb-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              value={updatedFormation.prixFormation}
              onChange={(e) =>
                setUpdatedFormation({
                  ...updatedFormation,
                  prixFormation: e.target.value,
                })
              }
              placeholder="Modifier le prix"
              className="mb-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              value={updatedFormation.nbMaxUtilisations}
              onChange={(e) =>
                setUpdatedFormation({
                  ...updatedFormation,
                  nbMaxUtilisations: e.target.value,
                })
              }
              placeholder="Modifier le nombre max d'utilisations"
              className="mb-4 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={updateFormation}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Mettre à jour
            </button>
          </div>

          {/* Bouton pour supprimer la formation */}
          <button
            onClick={() => deleteFormation(selectedFormation._id)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Supprimer cette formation
          </button>
        </div>
      )}
    </div>
  );
}
