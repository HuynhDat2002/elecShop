// 6LfXO5QqAAAAADU5UPm71o7LmuIhN-K5_M3Ztez0
'use client'
import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Checkbox,
    Link,
    Button,
} from "@heroui/react";
import { LoginProps } from "../types";
import { Input } from "@heroui/react";
// import Recaptcha from "./Recaptcha";
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from "../lib/hooks"
import { logIn, checkDevice } from "../lib/features/user.slice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faEnvelope, faLock, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from "next/navigation";
import Spin from "./Spinner";
// import ReCAPTCHA from "react-google-recaptcha";

export default function Login({ isOpen, onClose, openSignUp, openForgot, openVerifyDevice }: LoginProps) {
    const [tokenCaptcha, setTokenCaptcha] = useState("")
    const [isOpenSign, setIsOpenSign] = useState(false)
    const [isError, setError] = useState(false)
    const [messageError, setMessageError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const user: any = useAppSelector((state) => state.userReducer)
    const router = useRouter()
    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Chưa đúng định dạng email")
            .required("Không được bỏ trống"),
        password: yup.string().required("Không được bỏ trống").min(8),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async (value) => {
            await dispatch(checkDevice({ email: formik.values.email, password: formik.values.password, tokenCaptcha: tokenCaptcha }))
        },
    });
    useEffect(() => {
        if (user.isLogin) {
            if (user.isSuccess) { onClose(); window.location.reload() }
            if (user.isError && Object.keys(user.message).length === 0) { setError(true); setMessageError("Server Error") }
            if (user.isError && Object.keys(user.message).length > 0) { setError(true); setMessageError(`${user.message.message}`) }
        }
        if (user.isCheckDevice && user.isSuccess) {
            dispatch(logIn({ email: formik.values.email, password: formik.values.password, tokenCaptcha: tokenCaptcha }))
        }
        if (user.isCheckDevice && user.isError && user.message.message === "Ban dang dang nhap tren thiet bi moi, hay nhap ma OTP!") {
            openVerifyDevice()
        }
        if (user.isCheckDevice && user.isError && user.message.message !== "Ban dang dang nhap tren thiet bi moi, hay nhap ma OTP!") {
            setError(true); setMessageError(`${user.message.message}`)
        }
        if (user.isVerifyDevice && user.isSuccess) dispatch(logIn({ email: formik.values.email, password: formik.values.password, tokenCaptcha: tokenCaptcha }))
        if (user.isLoading) { setIsLoading(true) }
        if (!user.isLoading) setIsLoading(false)
        // if(!user.isCheck && !user.isLoading && user.isError &&  Object.keys(user.message).length === 0) {setError(true);setMessageError("Server Error")}
        // if(!user.isCheck  && !user.isLoading && user.isError && Object.keys(user.message).length >0)  {setError(true);setMessageError(`${user.message.message}`)}
    }, [user.isLoading, tokenCaptcha])
    console.log(`errorrrr`, isError)

    const handleError = () => {
        setError(false)
        setMessageError("")
    }

    const handleRecaptchaVerify = (token: string) => {
        // Send token to server for verification
    };
    const handleCaptchaChange = (value: any) => {
        console.log('reCAPTCHA Token:', value);
        setTokenCaptcha(value)

    }
    useEffect(() => {
        console.log('tokencaptcha', tokenCaptcha, "1")

    }, [tokenCaptcha])
    // useEffect(() => {
    //     const script = document.createElement("script");
    //     script.src = "https://www.google.com/recaptcha/api.js?hl=vi";
    //     script.async = true;
    //     script.defer = true;
    //     document.body.appendChild(script);
    // }, []);
    const recaptchaRef: any = React.createRef();
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
                            <ModalHeader className="gap-1 lg:text-xl">Đăng nhập</ModalHeader>
                            <form onSubmit={formik.handleSubmit}>
                                <ModalBody className=''>
                                    {isError &&
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mt-3" role="alert">
                                            <p>{messageError}</p>
                                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" >
                                                <FontAwesomeIcon icon={faTimesCircle} className="cursor-pointer" onClick={() => handleError()} />
                                            </span>
                                        </div>
                                    }
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

                                    <div className="flex py-2 px-1 justify-between">

                                        <Link className="lg:text-xl hover:border-b-1 hover:border-ctBlue-logo text-blue-500 cursor-pointer" onClick={openForgot} size="sm">
                                            Quên mật khẩu?
                                        </Link>
                                    </div>
                                    {/* <ReCAPTCHA
                                        sitekey="6LcTMZcqAAAAAAYpYV-BoPjawYsv7_uJutvjVSF0"
                                        onChange={handleCaptchaChange}
                                    /> */}
                                    {isLoading &&
                                        <Spin />

                                    }
                                    <Button className="cursor-pointer text-white bg-ctBlue-header shadow-md focus:ring-4 focus:outline-none focus:ring-gray-300 font-semibold rounded-lg lg:text-xl px-4 py-3" type="submit">
                                        Đăng nhập
                                    </Button>
                                </ModalBody>
                                <ModalFooter className=" flex justify-center">
                                    <div className=" flex flex-row gap-2 justify-between items-center">
                                        <p className="lg:text-xl">Bạn chưa có tài khoản?</p>
                                        <div className="text-ctBlue-logo lg:text-xl hover:border-b-2 cursor-pointer" onClick={openSignUp}>Đăng ký</div>
                                    </div>



                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    );
}