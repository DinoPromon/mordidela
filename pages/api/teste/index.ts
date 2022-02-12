import { Prisma } from "@database";
import mv from "mv";
import { ImageHandler } from "database/helpers/image";
import { IncomingForm } from "formidable";
import { parse as uuidParse, stringify as uuidStringify } from "uuid";
import { ReqMethod } from "@my-types/backend/req-method";

import type { NextApiHandler } from "next";
import type { File as FormidableFile } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const handler: NextApiHandler = async (req, res) => {
  if (req.method === ReqMethod.PUT) return res.status(405).json({ message: "Requisição inválida" });

  if (req.method === ReqMethod.GET) {
    try {
      const testes = await Prisma.teste.findMany();
      const parsedTestes = testes.map((teste) => uuidStringify(teste.uuid));
      return res.status(200).json(parsedTestes);
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: "Aconteceu algo de errado" });
    }
  }

  if (req.method === ReqMethod.POST) {
    try {
      const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          if (Array.isArray(files.file)) reject(err);
          const { uuid } = fields;

          const imageHelper = new ImageHandler(files.file as FormidableFile);
          const moved = imageHelper.moveToPublic(uuid as string);

          if (!moved) reject("Could not move file");

          Prisma.teste
            .create({
              data: {
                uuid: Buffer.from(uuidParse(String(uuid)) as Array<number>),
              },
            })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
      });
      res.status(200).json({ message: "Criado com sucesso" });
    } catch (e) {
      const error = e as Error;
      return res.status(500).json({ message: "Algo deu errado" });
    }
  }
};

export default handler;
