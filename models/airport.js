module.exports = (sequelize, DataTypes) => {
    const Airport = sequelize.define('Airport', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      icao_code: DataTypes.STRING,
      iata_code: DataTypes.STRING,
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      latitude_deg: DataTypes.FLOAT,
      longitude_deg: DataTypes.FLOAT,
      elevation_ft: DataTypes.INTEGER
    });
  
    return Airport;
  };