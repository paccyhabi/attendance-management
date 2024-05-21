const db = require('../models');

// create main model
const Institution = db.institutions;

// main work
// 1. create Product
const addInstitution = async (req, res) => {
    try {
        const { instName,address,url,email,phone} = req.body;

        const institution = await Institution.create({
            instName,
            address,
            url,
            email,
            phone,
        });

        res.status(200).send(institution);
        console.log(institution);
    } catch (error) {
        console.error("Error creating instution:", error);
        res.status(400).send('institution creation failed');
    }
};




// get all Products
const getAllInstitutions= async (req, res) => {
    try {
        let institutions = await Institution.findAll();
        res.status(200).send(institutions);
    } catch (error) {
        res.status(500).send('Error fetching instutions');
    }
};

// get Single Product
const getOneInstitution = async (req, res) => {
    try {
        let id = req.params.id;
        let institution = await Institution.findOne({ where: { id } });
        if (institution) {
            res.status(200).send(institution);
        } else {
            res.status(404).send('institution not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching institution');
    }
};

// Update Product
const updateInstitution= async (req, res) => {
    let id = req.params.id;
    let institution = await Institution.findOne({ where: { id } });

    if (!institution) {
        res.status(404).send('Product not found');
        return;
    }

    try {
        // Update other Product data based on req.body (e.g., Productname, price)
        institution.instName = req.body.instName || institution.instName;
        institution.address = req.body.address || institution.address;
        institution.url = req.body.url || institution.url;
        institution.email = req.body.email || institution.email;
        institution.phone = req.body.phone || institution.phone;

        // Save the updated Product
        await Institution.save();

        res.status(200).send({ message: 'institution updated!' });
    } catch (error) {
        res.status(500).send('Error updating institution');
    }
};

const updateInstitutionn = async (req, res) => {
    const id = req.params.id;
    const updatedFields = req.body;
  
    try {
        let instituion = await Institution.findOne({ where: { id } });
      if (!instituion) {
        return res.status(404).send('institution not found');
      }
      await instituion.update(updatedFields);
      await instituion.save();
      res.status(200).send({ message: 'institution updated!' });
    } catch (error) {
      console.error('Error updating institution:', error);
      res.status(500).send('Error updating institution');
    }
  };
  
// Delete any Product
const deleteInstitution = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedCount = await Institution.destroy({ where: { id } });
        if (deletedCount > 0) {
            res.status(200).send('institution is deleted');
        } else {
            res.status(404).send('instituion not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting institution');
    }
};

module.exports = {
    addInstitution,
    getAllInstitutions,
    getOneInstitution,
    updateInstitution,
    updateInstitutionn,
    deleteInstitution,
}
