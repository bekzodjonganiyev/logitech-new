import Link from "next/link"

import { ClickSvg, HumoSvg, LogitechSvg, MastercardSvg, PaymeSvg, UzcardSvg, VisaSvg, TelegramSvg, InstagramSvg } from "@/components/icons"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui"

import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

export const Footer = () => {
    const { lang } = useLanguageStore()
    const { footer } = getDictionaryObject(lang)

    return (
        <footer className='pb-10 max-custom-1:pb-20'>
            <div className="container flex justify-between items-start bg-white gap-5 max-custom-1:hidden">
                {/* LOGO */}
                <div>
                    <LogitechSvg />
                    <p className="font-light text-sm">© 2024 OOO «Bek and Sons»</p>

                    <br />

                    <h4 className="font-semibold">{footer.contactWithWe.paymentTypes}</h4>
                    <div className="grid grid-cols-2 justify-center gap-2 max-custom-1:pr-32">
                        <span className="flex items-center justify-center border border-darkgray p-2 rounded-payment-type-card"><PaymeSvg /></span>
                        <span className="flex items-center justify-center border border-darkgray p-2 rounded-payment-type-card"><UzcardSvg /></span>
                        <span className="flex items-center justify-center border border-darkgray p-2 rounded-payment-type-card"><ClickSvg /></span>
                        <span className="flex items-center justify-center border border-darkgray p-2 rounded-payment-type-card"><HumoSvg /></span>
                        <span className="flex items-center justify-center border border-darkgray p-2 rounded-payment-type-card"><VisaSvg /></span>
                        <span className="flex items-center justify-center border border-darkgray p-2 rounded-payment-type-card"><MastercardSvg /></span>
                    </div>
                </div>

                {/* Nima uchun bizni tanlaysiz */}
                <div className="">
                    <h4 className="font-semibold mb-5 leading-4">{footer.whySelectWe.title}</h4>
                    <ul className="flex flex-col custom-1:gap-3 gap-1">
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.whySelectWe.easyPay}</Link></li>
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.whySelectWe.deliveryService}</Link></li>
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.whySelectWe.props}</Link></li>
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.whySelectWe.termPayment}</Link></li>
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.whySelectWe.showroom}</Link></li>
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.whySelectWe.programs}</Link></li>
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.whySelectWe.contracts}</Link></li>
                    </ul>
                </div>

                {/* Kompaniya haqida */}
                <div>
                    <h4 className="font-semibold mb-5 leading-4">{footer.aboutCompany.title}</h4>
                    <ul className="flex flex-col custom-1:gap-3 gap-1">
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.aboutUs}</Link></li>
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.contacts}</Link></li>
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.dataPrivacy}</Link></li>
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.termsOfOffer}</Link></li>
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.systemRules}</Link></li>
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.quaestions}</Link></li>
                        <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.promotionConditions}</Link></li>
                    </ul>
                </div>

                {/* Biz bilan bog’lanish */}
                <div className="">
                    <h4 className="font-semibold mb-5 leading-4">{footer.contactWithWe.title}</h4>
                    <p className="font-light leading-5">
                        {footer.contactWithWe.numbers}: <br />
                        <span className="font-light text-primary">+998 (77) 707 22 20</span> <br />
                        <span className="font-light text-primary">+998 (95) 142 22 20</span>
                    </p>
                    <p className="font-light my-3 leading-5">
                        {footer.contactWithWe.email}: <br />
                        <span className="font-light text-primary">info@logitech.uz</span> <br />
                        <span className="font-light text-primary">support@logitech.uz</span>
                    </p>
                    <p className="font-light">
                        {footer.contactWithWe.socials}: <br />
                        <span className="flex items-center gap-3">
                            <a href="https://t.me/logitechbybeknsons" target="_blank" className="border border-gray rounded-md p-1 w-8 h-8 flex items-center justify-center"><TelegramSvg /></a>
                            <a href="https://www.instagram.com/logitechuz" target="_blank" className="border border-gray rounded-md p-1 w-8 h-8 flex items-center justify-center"><InstagramSvg /></a>
                        </span>
                    </p>
                </div>
            </div>

            <div className="container w-full custom-1:hidden">
                <Accordion type="multiple" className="max-custom-1:block max-sm:hidden">
                    <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="text-lg">{footer.whySelectWe.title}</AccordionTrigger>
                        <AccordionContent>
                            <ul className="flex flex-col custom-1:gap-3 gap-1">
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.whySelectWe.easyPay}</Link></li>
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.whySelectWe.deliveryService}</Link></li>
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.whySelectWe.props}</Link></li>
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.whySelectWe.termPayment}</Link></li>
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.whySelectWe.showroom}</Link></li>
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.whySelectWe.programs}</Link></li>
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.whySelectWe.contracts}</Link></li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-none">
                        <AccordionTrigger className="text-lg">{footer.aboutCompany.title}</AccordionTrigger>
                        <AccordionContent>
                            <ul className="flex flex-col custom-1:gap-3 gap-1">
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.aboutCompany.aboutUs}</Link></li>
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.aboutCompany.contacts}</Link></li>
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.aboutCompany.dataPrivacy}</Link></li>
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.aboutCompany.termsOfOffer}</Link></li>
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.aboutCompany.systemRules}</Link></li>
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.aboutCompany.quaestions}</Link></li>
                                <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3 text-base">{footer.aboutCompany.promotionConditions}</Link></li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-none">
                        <AccordionTrigger className="text-lg">{footer.contactWithWe.title}</AccordionTrigger>
                        <AccordionContent>
                            <p className="font-light leading-5">
                                {footer.contactWithWe.numbers}: <br />
                                <span className="font-light text-primary">+998 (77) 707 22 20</span> <br />
                                <span className="font-light text-primary">+998 (95) 142 22 20</span>
                            </p>
                            <p className="font-light my-3 leading-5">
                                {footer.contactWithWe.email}: <br />
                                <span className="font-light text-primary">info@logitech.uz</span> <br />
                                <span className="font-light text-primary">support@logitech.uz</span>
                            </p>
                            <p className="font-light">
                                {footer.contactWithWe.socials}: <br />
                                <span className="flex items-center gap-3">
                                    <a href="https://t.me/logitechbybeknsons" target="_blank" className="border border-gray rounded-md p-1 w-8 h-8 flex items-center justify-center"><TelegramSvg /></a>
                                    <a href="https://www.instagram.com/logitechuz" target="_blank" className="border border-gray rounded-md p-1 w-8 h-8 flex items-center justify-center"><InstagramSvg /></a>
                                </span>
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="max-sm:block hidden">
                    <div className="mb-10">
                        <LogitechSvg className="mb-3" />

                        <p className="font-light leading-5">
                            {footer.contactWithWe.numbers}: <br />
                            <span className="font-light text-primary">+998 (77) 707 22 20</span> <br />
                            <span className="font-light text-primary">+998 (95) 142 22 20</span>
                        </p>
                        <p className="font-light my-3 leading-5">
                            {footer.contactWithWe.email}: <br />
                            <span className="font-light text-primary">info@logitech.uz</span> <br />
                            <span className="font-light text-primary">support@logitech.uz</span>
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3 leading-4">{footer.aboutCompany.title}</h4>
                        <ul className="flex flex-col custom-1:gap-3 gap-0">
                            <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.aboutUs}</Link></li>
                            <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.contacts}</Link></li>
                            <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.dataPrivacy}</Link></li>
                            <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.termsOfOffer}</Link></li>
                            <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.systemRules}</Link></li>
                            <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.quaestions}</Link></li>
                            <li className="text-darkgray font-light hover:text-primary"><Link href="" className="leading-3">{footer.aboutCompany.promotionConditions}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-3 justify-center gap-x-5 gap-y-2 my-5">
                    <span className="flex items-center justify-center max-sm:h-10 max-custom-1:h-14 border border-darkgray p-2 rounded-payment-type-card"><PaymeSvg /></span>
                    <span className="flex items-center justify-center max-sm:h-10 max-custom-1:h-14 border border-darkgray p-2 rounded-payment-type-card"><UzcardSvg /></span>
                    <span className="flex items-center justify-center max-sm:h-10 max-custom-1:h-14 border border-darkgray p-2 rounded-payment-type-card"><ClickSvg /></span>
                    <span className="flex items-center justify-center max-sm:h-10 max-custom-1:h-14 border border-darkgray p-2 rounded-payment-type-card"><HumoSvg /></span>
                    <span className="flex items-center justify-center max-sm:h-10 max-custom-1:h-14 border border-darkgray p-2 rounded-payment-type-card"><VisaSvg /></span>
                    <span className="flex items-center justify-center max-sm:h-10 max-custom-1:h-14 border border-darkgray p-2 rounded-payment-type-card"><MastercardSvg /></span>
                </div>

                <hr className="border-[1px]" />
                <p className="font-light text-sm">© 2024 OOO «Bek and Sons»</p>
            </div>
        </footer>
    )
}
