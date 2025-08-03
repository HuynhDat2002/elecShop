'use client'
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox, Link } from "@heroui/react";
import { SignProps } from '../types/index'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from "../lib/hooks"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faEnvelope, faLock, faUser, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { sendOTP } from "../lib/features/user.slice";

import Spin from './Spinner'
export default function SignUp({ isOpen, onClose, openLogin, openVerifySign }: SignProps) {
    const [isOpenLogin, setIsOpenLogin] = useState(false)
    const user: any = useAppSelector((state) => state.userReducer)
    const dispatch = useAppDispatch()
    const [isError, setError] = useState(false)
    const [messageError, setMessageError] = useState("")
    const [isSpin, setIsSpin] = useState(false)

    const schema = yup.object().shape({
        name: yup.string().required("Không được bỏ trống"),
        email: yup
            .string()
            .email("Không được bỏ trống")
            .required("Không được bỏ trống"),
        password: yup.string().required("Không được bỏ trống").min(8),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'Mật khẩu phải trùng khớp')
            .required('Nhập lại mật khẩu'),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: schema,
        onSubmit: async (value) => {
            await dispatch(sendOTP({
                name: value.name,
                email: value.email,
                password: value.password
            }))
        },
    });

    useEffect(() => {
        if (user.isSendOTP && user.isSuccess) openVerifySign()
    }, [user.isLoading])

    useEffect(() => {
        if (user.isLoading) setIsSpin(true)
        else setIsSpin(false)
    }, [user.isLoading])

    const handleError = () => {
        setError(false)
        setMessageError("")
    }
    console.log('isopennnn', isOpenLogin)

    return (
        <>
            {isOpen &&
                <div className="fixed inset-0 bg-black opacity-40 z-10"></div>
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

                                <ModalHeader className="flex flex-col gap-1 lg:text-xl">Đăng ký</ModalHeader>
                                <ModalBody>
                                    {isError &&
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mt-3" role="alert">
                                            <p>{messageError}</p>
                                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" >
                                                <FontAwesomeIcon icon={faTimesCircle} className="cursor-pointer" onClick={handleError} />
                                            </span>
                                        </div>
                                    }


                                    <div className="flex flex-col gap-2 mb-3">
                                        <p className="lg:text-xl font-medium">Tên</p>
                                        <Input
                                            name="name"
                                            placeholder="Nhập tên..."
                                            classNames={{
                                                input: "focus:outline-none lg:text-xl",
                                                inputWrapper: [
                                                    "border-1 border-gray-300",
                                                    "rounded-xl",
                                                    "p-2",
                                                    "backdrop-blur-sm",
                                                ],
                                            }}
                                            type="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}

                                        />
                                        {formik.touched.name && formik.errors.name ? (
                                            <div className="text-red-500 text-sm">{formik.errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col gap-2 mb-3">
                                        <p className="lg:text-xl font-medium">Email</p>
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
                                    <div className="flex flex-col gap-2 mb-3">
                                        <p className="lg:text-xl font-medium">Mật khẩu</p>
                                        <Input
                                            name="password"
                                            placeholder="Nhập mật khẩu"
                                            classNames={{
                                                label: "lg:text-xl",
                                                input: "focus:outline-none lg:text-xl",
                                                inputWrapper: [
                                                    "border-1 border-gray-300",
                                                    "rounded-xl",
                                                    "p-2",
                                                    "backdrop-blur-sm",
                                                ],
                                            }}
                                            type="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}

                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="text-red-500 lg:text-xl">{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col gap-2 mb-3">
                                        <p className="lg:text-xl font-medium">Mật khẩu</p>
                                        <Input
                                            name="confirmPassword"
                                            placeholder="Nhập lại mật khẩu..."
                                            classNames={{
                                                label: "lg:text-xl",
                                                input: "focus:outline-none lg:text-xl",
                                                inputWrapper: [
                                                    "border-1 border-gray-300",
                                                    "rounded-xl",
                                                    "p-2",
                                                    "backdrop-blur-sm",
                                                ],
                                            }}
                                            type="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}

                                        />
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                            <div className="text-red-500 lg:text-xl">{formik.errors.confirmPassword}</div>
                                        ) : null}
                                    </div>

                                    {isSpin &&
                                        <Spin />

                                    }
                                    <Button className="cursor-pointer text-white bg-ctBlue-header shadow-md focus:ring-4 focus:outline-none focus:ring-gray-300 font-semibold rounded-lg lg:text-xl px-4 py-3" type="submit">
                                        Đăng ký
                                    </Button>
                                </ModalBody>
                                <ModalFooter className=" flex justify-center">

                                      <div className=" flex flex-row gap-2 justify-between items-center">
                                        <p className="lg:text-xl">Bạn đã có tài khoản?</p>
                                        <div className="text-ctBlue-logo lg:text-xl hover:border-b-2 cursor-pointer" onClick={openLogin}>Đăng nhập</div>
                                    </div>

                                </ModalFooter>
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