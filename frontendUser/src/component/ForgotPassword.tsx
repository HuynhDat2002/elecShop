'use client'
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox, Link } from "@heroui/react";
import { forgotPassword } from "../lib/features/user.slice";
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from "../lib/hooks"
import { logIn } from "../lib/features/user.slice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faEnvelope, faLock, faUser, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { resetState } from "../lib/features/user.slice";
import Spin from './Spinner'
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
export default function ForgotPassword({ isOpen, onClose, openLogin, openVerify }: {
    isOpen: boolean, onClose: () => void, openLogin: () => void, openVerify: () => void
}) {
    const [isOpenLogin, setIsOpenLogin] = useState(false)
    const user: any = useAppSelector((state) => state.userReducer)
    const dispatch = useAppDispatch()
    const [isError, setError] = useState(false)
    const [isSpin, setIsSpin] = useState(false)

    const [messageError, setMessageError] = useState("")
    const schema = yup.object().shape({

        email: yup
            .string()
            .email("Không được bỏ trống")
            .required("Không được bỏ trống"),

    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: schema,
        onSubmit: async (value) => {
            console.log('value', value)
            await dispatch(forgotPassword(value))
        },
    });

    useEffect(() => {
        if (user.isForgot && user.isSuccess) openVerify()
        if (user.isForgot && user.isError) {
            if (Object.keys(user.message).length === 0) { setError(true); setMessageError("Server Error") }
            if (Object.keys(user.message).length > 0) { setError(true); setMessageError(`${user.message.message}`) }
        }
    }, [user.isLoading])

    useEffect(() => {
        if (user.isLoading) setIsSpin(true)
        else setIsSpin(false)
    }, [user.isLoading])
    const handleError = async (e: any) => {
        e.preventDefault();
        setError(false)
        setMessageError("")
    }

    return (
        <>
            {isOpen &&
                <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            }
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                placement="center"
                isDismissable={false}
                className="bg-white p-5 rounded-xl w-[80%] lg:w-full"
                classNames={{
                    closeButton: "flex justify-center items-center right-4 top-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-black text-xl hover:text-gray-800 transition-all"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={formik.handleSubmit}>

                                <ModalHeader className="flex flex-col gap-1 lg:text-xl">
                                    <div className="flex flex-row items-center gap-3">
                                        <ChevronLeftIcon  className="size-6 text-black cursor-pointer" onClick={openLogin}/>
                                        <p>Quên mật khẩu</p>
                                    </div>
                                </ModalHeader>
                                <ModalBody>
                                    <p className="text-gray-700 lg:text-xl">Hãy nhập địa chỉ email của bạn để lấy lại mật khẩu</p>
                                    {isError &&
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mt-3" role="alert">
                                            <p>{messageError}</p>
                                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" >
                                                <FontAwesomeIcon icon={faTimesCircle} className="cursor-pointer" onClick={handleError} />
                                            </span>
                                        </div>
                                    }
                                    <div className="flex flex-col gap-2 mb-3">
                                        <Input
                                            name="email"
                                            placeholder="you@example.com"
                                            classNames={{
                                                input: "focus:outline-none lg:text-xl",
                                                inputWrapper: [
                                                    "border-1 border-gray-300",
                                                    "rounded-xl",
                                                    "p-2",
                                                    "backdrop-blur-sm",
                                                ],
                                            }}
                                            type="email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}

                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="text-red-500 lg:text-xl">{formik.errors.email}!</div>
                                        ) : null}
                                    </div>

                                    {isSpin &&
                                        <Spin />

                                    }
                                    <Button className="cursor-pointer text-white bg-ctBlue-header shadow-md focus:ring-4 focus:outline-none focus:ring-gray-300 font-semibold rounded-lg lg:text-xl px-4 py-3" type="submit">
                                        Gửi
                                    </Button>
                                </ModalBody>
                            </form>

                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* {
                isOpenLogin &&
                <Login isOpenLogin={isOpenLogin} setIsOpenLogin={setIsOpenLogin} />
            } */}
        </>
    );
}