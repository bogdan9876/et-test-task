const Medicament = require('../model/Medicament');
const {Sequelize} = require("sequelize");

exports.getAllMedicaments = async (req, res) => {
  try {
    const { title, minPrice, maxPrice, store } = req.query;

    const whereClause = {};
    if (title) {
      whereClause.title = {
        [Sequelize.Op.like]: `%${title}%`
      };
    }
    if (store) {
      whereClause.store = {
        [Sequelize.Op.like]: `${store}`
      };
    }
    if (minPrice && maxPrice) {
      whereClause.price = {
        [Sequelize.Op.between]: [minPrice, maxPrice]
      };
    } else if (minPrice) {
      whereClause.price = {
        [Sequelize.Op.gte]: minPrice
      };
    } else if (maxPrice) {
      whereClause.price = {
        [Sequelize.Op.lte]: maxPrice
      };
    }


    const medicaments = await Medicament.findAll({
      where: whereClause
    });

    res.json(medicaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMedicamentById = async (req, res) => {
  try {
    const medicament = await Medicament.findByPk(req.params.id);
    if (!medicament) {
      res.status(404).json({ message: 'Medicament not found' });
    } else {
      res.json(medicament);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMedicament = async (req, res) => {
  try {
    const medicament = await Medicament.create(req.body);
    res.status(201).json(medicament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMedicament = async (req, res) => {
  try {
    const medicament = await Medicament.findByPk(req.params.id);
    if (!medicament) {
      res.status(404).json({ message: 'Medicament not found' });
    } else {
      await medicament.update(req.body);
      res.json(medicament);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMedicament = async (req, res) => {
  try {
    const medicament = await Medicament.findByPk(req.params.id);
    if (!medicament) {
      res.status(404).json({ message: 'Medicament not found' });
    } else {
      await medicament.destroy();
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFilteredMedicaments = async (req, res) => {
  try {
    res.json(filteredMedicaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};