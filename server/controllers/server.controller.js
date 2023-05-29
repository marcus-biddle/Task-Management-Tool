import Server from "../models/server.model.js";

const getServer = async (req, res) => {
    try {
      const serverId = req.params.id;
  
      const server = await Server.findOne({ _id: serverId });
      res.status(200).json({ server });
    } catch (err) {
      throw err;
    }
  }

const getServers = async (req, res) => {
    try {
        const servers = await Server.find();
        res.status(200).json({ servers });
    } catch (err) {
        throw err;
    }
}

const addServer = async (req, res) => {
    try {
        const { title, tasks, description, createdBy, active } = req.body;

        const server = new Server({
            title: title,
            tasks, tasks,
            description: description,
            createdBy: createdBy,
            active: active,
        })

        const newServer = await server.save();
        const allServers = await Server.find();

        res.status(200).json({ message: 'server added', server: newServer, servers: allServers })
    } catch (err) {
        throw err;
    }
};

const updateServer = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;

        if (!id) {
            // Handle the case where the id is missing
            return res.status(400).json({ error: 'Missing id parameter' });
        }

        const updateServer = await Server.findByIdAndUpdate( { _id: id }, body);
        const allServers = await Server.find();

        res.status(200).json({ 
            message: "Server updated",
            server: updateServer,
            servers: allServers,
        });
    } catch (err) {
        throw err;
    }
};

const deleteServer = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            // Handle the case where the id is missing
            return res.status(400).json({ error: 'Missing id parameter' });
        }
        
        const deletedServer = await Server.findByIdAndDelete({ _id: id });
        const allServersInServer = await Server.find();

        res.status(200).json({
            message: 'Server deleted',
            server: deletedServer,
            servers: allServersInServer,
        });
    } catch (err) {
        throw err;
    }
};

export { getServer, getServers, addServer, updateServer, deleteServer };