module.exports = (sequelize, Sequelize) => {
    const Catalogues = sequelize.define("catalogues", {
  
     id: {
          type: Sequelize.STRING,
          primaryKey:true,
          allowNull: false
        },  
      ref: {
        type: Sequelize.STRING,
        allowNull: false
      },
      titre: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },    
      prix: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      image_url:{
        type: Sequelize.STRING,
      }
   });
  return Catalogues;
  };
  