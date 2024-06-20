import { Router } from "express";
import { validate } from "@/services/validator.services";
import { verifyAuthToken } from "@/services/jwt.service";
import AddressController from "./address.controller";

const router = Router()

router.get('/all', verifyAuthToken, AddressController.getAllAddressByCustomerId)
router.get('/active', verifyAuthToken, AddressController.getCustomerActiveAddress)
router.get('/:address_id', verifyAuthToken, AddressController.getAddressByCustomerId)

router.post("/new", verifyAuthToken ,AddressController.customerAddNewAddress)

router.put("/active", verifyAuthToken, AddressController.setCustomerActiveAddress)
router.put("/:address_id", verifyAuthToken, AddressController.updateCustomerAddressById)
router.delete("/:address_id", verifyAuthToken, AddressController.deleteCustomerAddressById)
export default router