'use client'
import React, { useEffect, useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import Verify from "./Verify";
import Success from "./Success";
import VerifySign from "./VerifySign";
import Spin from './Spinner'
import ChangePassword from "./ChangePassword";
import VerifyNewDevice from "./VerifyNewDevice";
export default function ModalManager({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: any }) {
    const [isLoginOpen, setLoginOpen] = useState(true);
    const [isSignUpOpen, setSignUpOpen] = useState(false);
    const [isForgotOpen, setForgotOpen] = useState(false)
    const [isReset, setResetOpen] = useState(false)
    const [isVerify, setIsVerify] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSpin, setIsSpin] = useState(false)
    const [isVerifySign, setIsVerifySign] = useState(false)
    const [isChangePassword, setIsChangePassword] = useState(false)
    const [verifyDevice, setVerifyDeice] = useState(false)
    const openLogin = () => {
        resetState()
        setLoginOpen(true);
    };

    const openSignUp = () => {
        resetState()
        setSignUpOpen(true);
    };
    const openForgot = () => {
        resetState()
        setForgotOpen(true);
    }

    const openReset = () => {
        resetState()
        setResetOpen(true)
    }
    const openVerify = () => {
        resetState()

        setIsVerify(true)
    }
    // useEffect(() => { }, [isLoginOpen, isSignUpOpen])

    const openSuccess = () => {
        resetState()

        setIsSuccess(true)
    }

    const openVerifySign = () => {
        resetState()

        setIsVerifySign(true)
    }

    const openVerifyDevice = () => {
        resetState()

        setVerifyDeice(true)
    }

    const close = () => {
        setSignUpOpen(false);
        setForgotOpen(false);
        setLoginOpen(false);
        setResetOpen(false);
        setIsVerify(false)
        setIsSuccess(false)
        setIsVerifySign(false)
        setVerifyDeice(false)
        setIsOpen(false)
    }

    const resetState = () => {
        setSignUpOpen(false);
        setForgotOpen(false);
        setLoginOpen(false);
        setResetOpen(false);
        setIsVerify(false)
        setIsSuccess(false)
        setIsVerifySign(false)
        setVerifyDeice(false)
    }
    return (
        <>
            {isOpen &&
                <Login
                    isOpen={isLoginOpen}
                    onClose={close}
                    openSignUp={openSignUp}
                    openForgot={openForgot}
                    openVerifyDevice={openVerifyDevice}
                />
            }
            {isOpen &&

                <SignUp
                    isOpen={isSignUpOpen}
                    onClose={close}
                    openLogin={openLogin}
                    openVerifySign={openVerifySign}
                />
            }
            {/* {isOpen &&

                <ForgotPassword
                    isOpen={isForgotOpen}
                    onClose={() => { setForgotOpen(false); setIsOpen(false) }}
                    openLogin={openLogin}
                    openReset={openReset}
                />
            } */}
            {isOpen &&

                <ForgotPassword
                    isOpen={isForgotOpen}
                    onClose={close}
                    openLogin={openLogin}
                    openVerify={openVerify}
                />
            }
            {isOpen &&

                <ResetPassword
                    isOpen={isReset}
                    onClose={close}
                    openLogin={openLogin}
                    openSuccess={openSuccess}
                />
            }
            {isOpen &&

                <Verify
                    isOpen={isVerify}
                    onClose={close}
                    openLogin={openLogin}
                    openReset={openReset}
                />
            }
            {isOpen &&

                <VerifySign
                    isOpen={isVerifySign}
                    onClose={close}
                    openLogin={openLogin}
                    openSuccess={openSuccess}
                />
            }
            {isOpen &&

                <Success
                    isOpen={isSuccess}
                    onClose={close}
                    openLogin={openLogin}
                />
            }
            {isOpen &&

                <VerifyNewDevice
                    isOpen={verifyDevice}
                    onClose={close}
                />
            }
        </>
    );
}