import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import dynamic from 'next/dynamic'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DeliverySvg, GetFromStoreSvg } from '@/components/icons'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'

import { cn } from '@/lib/utils'
import { publicFetch } from '@/lib/requests'
import { getDictionaryObject } from '@/lib/dictionary'
import { useLanguageStore } from '@/store/lang-store'

import { Region, Regions } from '@/types/models/regions.model'

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false })
const Map = dynamic(() => import("@/components/map/map"), { ssr: false, loading: () => <div>LOADING</div> })

const fetchRegions = publicFetch<RegionsStateType>(false)
const fetchDistricts = publicFetch<DistrictsStateType>(false)

type RegionsStateType = { loading: boolean, error: unknown, data: Regions }
type DistrictsStateType = { loading: boolean, error: unknown, data: Region }


export const AdmissionTypePart = ({ getDeliveryType }:{getDeliveryType: (type: string) => void}) => {
    const { lang } = useLanguageStore()
    const { checkoutPage } =  getDictionaryObject(lang
        )
    const form = useFormContext()

    const { watch, setValue } = form

    const deliveryType = watch("delivery_type")
    const address = watch("address")

    const [regions, setRegions] = useState<RegionsStateType>({} as RegionsStateType)
    const [districts, setDistricts] = useState<DistrictsStateType>({} as DistrictsStateType)
    const [location, setLocation] = useState<[number, number]>([41.3249406, 69.2904787]);
    const [weather, setWeather] = useState<any>("");

    function handleLocationClick() {
        if (window.navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });
        } else {
            console.log("Geolocation not supported");
        }
    }

    function success(position: any) {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation([latitude, longitude])
        setValue("point", `${longitude}, ${latitude}`)
    }

    function error() {
        setLocation([41.3249406, 69.2904787])
        console.log("Unable to retrieve your location");
    }

    useEffect(() => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location[0]}&lon=${location[1]}&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
                setWeather(data.display_name);
            })
            .catch(error => console.log(error));

    }, [location])


    useEffect(() => {
        fetchRegions("/regions/", setRegions)
    }, [])

    return (
        <>
            <div className='flex items-center gap-2 mb-5'>
                <p className='custom-1:text-xl text-lg flex items-center'><span className='bg-primary w-6 h-6 mr-2 flex items-center justify-center font-semibold text-white'>2</span>{checkoutPage.form.deliveryType}</p>
                <span className='border border-dashed flex-1 box'></span>
            </div>

            <div>
                {/* Tabs */}
                <div className='flex justify-between gap-5'>
                    <FormField
                        control={form.control}
                        name="delivery_type"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(e) => {
                                            field.onChange(e)
                                            getDeliveryType(e)
                                        }}
                                        defaultValue={field.value}
                                        className="flex"
                                    >
                                        <FormItem className={cn('bg-lightgray text-darkgray rounded-btn py-2 px-4 w-1/2 cursor-pointer', deliveryType === "true" && "bg-primary text-white")}>
                                            <FormControl>
                                                <RadioGroupItem value="true" className='hidden' />
                                            </FormControl>
                                            <FormLabel className="font-normal cursor-pointer">
                                                <span className='flex items-center justify-center'><DeliverySvg fill={deliveryType === "true" ? "white" : "#697172"} stroke={deliveryType === "true" ? "white" : "#697172"} />{checkoutPage.form.deliveryByKourier}</span>
                                            </FormLabel>
                                        </FormItem>

                                        <FormItem className={cn('bg-lightgray text-darkgray rounded-btn py-2 px-4 w-1/2 cursor-pointer', deliveryType === "false" && "bg-primary text-white")} >
                                            <FormControl>
                                                <RadioGroupItem value="false" className='hidden' />
                                            </FormControl>
                                            <FormLabel className="font-normal cursor-pointer">
                                                <span className='flex items-center justify-center'><GetFromStoreSvg fill={deliveryType === "false" ? "white" : "#697172"} stroke={deliveryType === "false" ? "white" : "#697172"} />{checkoutPage.form.pickupFromStore}</span>
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <>
                    {
                        deliveryType === "true"
                            ? <div className='w-full mt-5 border-2 rounded-btn p-2'>
                                <div className='flex gap-5 my-3'>
                                    <FormField
                                        control={form.control}
                                        name="region"
                                        render={({ field }) => (
                                            <FormItem className='w-1/2'>
                                                <Select
                                                    defaultValue={field.value}
                                                    onValueChange={(e) => {
                                                        field.onChange(e)
                                                        fetchDistricts(`/regions/${e}/`, setDistricts)
                                                    }}
                                                >
                                                    <SelectTrigger className="py-5 focus:ring-primary">
                                                        <SelectValue placeholder={checkoutPage.form.selectRegion} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            (!regions.loading && regions.data) && regions.data.map(region => {
                                                                return (
                                                                    <SelectItem key={region.id} value={region.id.toString()}>{region.translations[lang].name}</SelectItem>
                                                                )
                                                            })
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="district"
                                        render={({ field }) => (
                                            <FormItem className='w-1/2'>
                                                <Select
                                                    defaultValue={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="py-5 focus:ring-primary">
                                                        <SelectValue placeholder={checkoutPage.form.selectDistrict} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            (!districts.loading && districts.data) && districts.data.districts.map(district => (
                                                                <SelectItem key={district.id} value={district.id.toString()}>{district.translations[lang].name}</SelectItem>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="text" placeholder={checkoutPage.form.mainAddress} className='py-5 focus-visible:ring-primary my-5' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem className='border-none bg-lightgray px-3 rounded-xl' value="item-1">
                                        <AccordionTrigger >{checkoutPage.form.selectAddressFromMap}</AccordionTrigger>
                                        <AccordionContent>
                                            <MapContainer
                                                center={[location?.[0], location?.[1]]}
                                                zoom={13}
                                                maxZoom={18}
                                                bounceAtZoomLimits={false}
                                                zoomAnimation
                                                fadeAnimation
                                                className="rounded-xl"
                                            >
                                                <Map
                                                    lat={location?.[0]}
                                                    lng={location?.[1]}
                                                    onMarkerChange={(a) => {
                                                        setLocation(a)
                                                    }}
                                                />
                                            </MapContainer>


                                            <div className='flex justify-between my-3'>
                                                <Input type="text" className="placeholder:text-gray py-6 rounded-xl rounded-r-none focus-visible:ring-0 text-lg bg-white" placeholder="Manzilni kiriting" readOnly value={weather} />
                                                <button type="button" className="rounded-btn rounded-l-none bg-primary text-white text-sm px-5" onClick={() => handleLocationClick()}>{checkoutPage.form.myLocation}</button>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                            : <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="w-full mt-5 border-2 rounded-btn p-2">
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={(e) => {
                                                    field.onChange(e)
                                                }}
                                                defaultValue={field.value}
                                                className="flex flex-col gap-2"
                                            >
                                                <FormItem className={cn('text-darkgray cursor-pointer flex items-end', address === "malika" && "")}>
                                                    <FormControl>
                                                        <RadioGroupItem value="malika" className='mr-2 w-5 h-5' />
                                                    </FormControl>
                                                    <FormLabel className="font-normal cursor-pointer">
                                                        Malikadan olish
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className={cn('text-darkgray cursor-pointer flex items-end', address === "showroom" && "")} >
                                                    <FormControl>
                                                        <RadioGroupItem value="showroom" className='mr-2 w-5 h-5' />
                                                    </FormControl>
                                                    <FormLabel className="font-normal cursor-pointer">
                                                        Showroomdan olish
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                    }
                </>
            </div>

            <br />
            <br />
        </>
    )
}
