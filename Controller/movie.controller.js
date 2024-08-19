const { where } = require("sequelize");
let table = require("../models");
let moviesController = table.Movies;

const createMovie = async (req, res) => {
  try {
    let data = req.body;

     let value = await moviesController.create(data)
    if (!value) {
        return res.status(400).json({ message : ' process unsuccesfull'})
    }
    return res.status(201).json({ message : "upload succesfull"})

  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
};

const viewAll = async (req,res)=>{
    try {
        let data = await moviesController.findAll()
        if (!data) {
            return res.status(404).json({ message : 'page not found'})
        }

        return res.status(200).json({ message : data })
        
    } catch (error) {
        return res.status(500).json({ message : error})
    }
};

const viewId = async (req,res)=>{
    try {
        let {id} = req.params;
        const value = await moviesController.findOne({where:{id:id}});
    
        if (!value) {
           return res.status(500).json({ message : 'internal server error'})
        }
        return res.status(200).json({ message : value})

    } catch (error) {
        return res.json({
            status :500,
            message : error.message
        })
    }
  
};

const updateMovie = async (req,res)=>{
    
    let {id} = req.params;
    let correctionData = req.body

    const value = await moviesController.update(correctionData,{where:{id : id}});
    if (!value) {
       return res.status(500).json({message : 'internal server error'}) 
    }
    return res.status(201).json({ message : 'updated succesfull'})

};

const deleteId = async (req,res)=>{
    try {
        let {id}= req.params

        const deleteMovie = await moviesController.destroy({where:{id:id}})

        if (!deleteMovie) {
            return res.status(400).json({ message : 'movie not delete'})
        }

        return res.status(200).json({ message : "succesfully deleted"})

    } catch (error) {
        return req.status(500).json({ message : 'internal server error'})
    }
}

module.exports = {
  createMovie,
  viewAll,
  viewId,
  updateMovie,
  deleteId
};
