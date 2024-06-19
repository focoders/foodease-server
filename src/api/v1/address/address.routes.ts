import { Router } from "express";
import { validate } from "@/services/validator.services";
import { verifyAuthToken } from "@/services/jwt.service";
import AddressController from "./address.controller";

const router = Router()

router.post("/new", verifyAuthToken ,AddressController.customerAddNewAddress)

router.delete("/:address_id", verifyAuthToken, AddressController.deleteCustomerAddressById)

export default router