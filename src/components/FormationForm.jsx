import { useState } from 'react';

const FormationForm = () => {
  const [formData, setFormData] = useState({
    dateCreation: '',
    nomFormation: '',
    thematiqueFormation: '',
    nbMaxUtilisations: '',
    prixFormation: '',
    dateAjout: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
  
    try {
      // Envoi des données au backend
      const response = await fetch('https://backendplateforme2.onrender.com/formations', {  // URL mise à jour ici
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  // Envoi des données sous forme de JSON
      });
  
      if (response.ok) {
        const result = await response.json();
        setMessage('Formation ajoutée avec succès !');
        console.log('Réponse du backend :', result);
  
        // Réinitialisation du formulaire après soumission réussie
        setFormData({
          dateCreation: '',
          nomFormation: '',
          thematiqueFormation: '',
          nbMaxUtilisations: '',
          prixFormation: '',
          dateAjout: '',
        });
      } else {
        const error = await response.json();
        setMessage(`Erreur : ${error.message || 'Une erreur est survenue.'}`);
      }
    } catch (err) {
      console.error('Erreur réseau :', err);
      setMessage('Erreur de connexion au serveur.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Formulaire de Création de Formation</h2>

      {/* Affichage du message d'erreur ou de succès */}
      {message && (
        <div className="mb-4 text-center">
          <p className={`text-lg ${message.includes('Erreur') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Champs du formulaire */}
        <div className="mb-4">
          <label htmlFor="dateCreation" className="block text-sm font-medium text-gray-700">Date de Création</label>
          <input
            type="date"
            id="dateCreation"
            name="dateCreation"
            value={formData.dateCreation}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="nomFormation" className="block text-sm font-medium text-gray-700">Nom de la Formation</label>
          <input
            type="text"
            id="nomFormation"
            name="nomFormation"
            value={formData.nomFormation}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="thematiqueFormation" className="block text-sm font-medium text-gray-700">Thématique de la Formation</label>
          <input
            type="text"
            id="thematiqueFormation"
            name="thematiqueFormation"
            value={formData.thematiqueFormation}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="nbMaxUtilisations" className="block text-sm font-medium text-gray-700">Nombre Maximum d'Utilisations</label>
          <input
            type="number"
            id="nbMaxUtilisations"
            name="nbMaxUtilisations"
            value={formData.nbMaxUtilisations}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="prixFormation" className="block text-sm font-medium text-gray-700">Prix de la Formation</label>
          <input
            type="number"
            id="prixFormation"
            name="prixFormation"
            step="0.01"
            value={formData.prixFormation}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="dateAjout" className="block text-sm font-medium text-gray-700">Date d'Ajout de la Formation</label>
          <input
            type="date"
            id="dateAjout"
            name="dateAjout"
            value={formData.dateAjout}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg"
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Créer la Formation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormationForm;
