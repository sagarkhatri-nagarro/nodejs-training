module.exports = (sequelize,DataTypes)=>{
    const Student = sequelize.define("Student",{
        rollno: {
            type: DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
        },
        name :DataTypes.STRING,
        dob:DataTypes.STRING,
        score:DataTypes.INTEGER,
    });
    return Student;
}
