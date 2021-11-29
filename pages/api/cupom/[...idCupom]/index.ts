import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { idCupom } = req.query;
  
  if(req.method === 'GET') {
  }
};

export default handler;