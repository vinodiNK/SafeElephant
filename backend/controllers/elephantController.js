const db = require('../firebase/config');

const getElephantLocations = async (req, res) => {
  try {
    const ref = db.ref('elephant_locations');
    ref.once('value', (snapshot) => {
      const data = snapshot.val();
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error });
  }
};

module.exports = { getElephantLocations };
