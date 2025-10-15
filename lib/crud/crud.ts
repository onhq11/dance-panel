import { CrudConfig, IdPromise } from "@lib/utils/_shared/types";
import { buildGETListQuery } from "@lib/utils/GET/list/sql/sql";
import { GETListSuccessResponse } from "@lib/utils/GET/list/response/GETListSuccessResponse";
import { GETListErrorResponse } from "@lib/utils/GET/list/response/GETListErrorResponse";
import { POSTSuccessResponse } from "@lib/utils/POST/create/response/POSTSuccessResponse";
import { POSTErrorResponse } from "@lib/utils/POST/create/response/POSTErrorResponse";
import { buildPOSTQuery } from "@lib/utils/POST/create/sql/sql";
import { GETReadErrorResponse } from "@lib/utils/GET/read/response/GETReadErrorResponse";
import { GETReadSuccessResponse } from "@lib/utils/GET/read/response/GETReadSuccessResponse";
import { buildGETReadQuery } from "@lib/utils/GET/read/sql/sql";
import { DELETEErrorResponse } from "@lib/utils/DELETE/remove/response/DELETEErrorResponse";
import { buildDELETEQuery } from "@lib/utils/DELETE/remove/sql/sql";
import { DELETESuccessResponse } from "@lib/utils/DELETE/remove/response/DELETESuccessResponse";
import { DELETENotFoundResponse } from "@lib/utils/DELETE/remove/response/DELETENotFoundResponse";
import { PATCHErrorResponse } from "@lib/utils/PATCH/update/response/PATCHErrorResponse";
import { buildPATCHQuery } from "@lib/utils/PATCH/update/sql/sql";
import { PATCHNotFoundResponse } from "@lib/utils/PATCH/update/response/PATCHNotFoundResponse";

export function createCrudHandlers(cfg: CrudConfig) {
  const GET = async (req: Request) => {
    try {
      const { data, meta } = await buildGETListQuery(req, cfg);
      return GETListSuccessResponse(data, meta);
    } catch (error: any) {
      console.error(error.message);
      return GETListErrorResponse();
    }
  };

  const POST = async (req: Request) => {
    try {
      const res = await buildPOSTQuery(req, cfg);
      return POSTSuccessResponse(res.insertId);
    } catch (error: any) {
      console.error(error.message);
      return POSTErrorResponse();
    }
  };

  return { GET, POST };
}

export function createCrudHandlersById(cfg: CrudConfig) {
  const GET = async (_: Request, { params }: IdPromise) => {
    const { id } = await params;

    try {
      const data = await buildGETReadQuery(+id, cfg);
      return GETReadSuccessResponse(data);
    } catch (error: any) {
      console.error(error.message);
      return GETReadErrorResponse();
    }
  };

  const PATCH = async (req: Request, { params }: IdPromise) => {
    const { id } = await params;

    try {
      const success = await buildPATCHQuery(req, +id, cfg);
      if (success) {
        return GET(req, { params });
      }

      return PATCHNotFoundResponse();
    } catch (error: any) {
      console.error(error.message);
      return PATCHErrorResponse();
    }
  };

  const DELETE = async (_: Request, { params }: IdPromise) => {
    const { id } = await params;

    try {
      const success = await buildDELETEQuery(+id, cfg);
      if (success) {
        return DELETESuccessResponse();
      }

      return DELETENotFoundResponse();
    } catch (error: any) {
      console.error(error.message);
      return DELETEErrorResponse();
    }
  };

  return { GET, PATCH, DELETE };
}
