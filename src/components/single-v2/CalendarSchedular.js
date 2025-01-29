import Image from "next/image";
import Link from "next/link";
import React from "react";

const CalendarSchedular = ({ data }) => {
    const propertyEmail = data?.PropertyEmail;
    const propertyPrimaryPhone = data?.PropertyPrimaryPhone;
    const propertyDefaultImageUrl = data?.Images?.PropertyDefaultImageUrl;
    const scheduleShowingUrl = data?.ScheduleShowingUrl;

    return (
        <div className="agent-single d-sm-flex align-items-center pb25">
            {/* Property Image */}
            {/*  <div className="single-img mb30-sm">
                {propertyDefaultImageUrl ? (
                    <Image
                        width={120}
                        height={90}
                        className="w120"
                        src={propertyDefaultImageUrl}
                        alt="Property Default Image"
                    />
                ) : (
                    <p>No image available</p>
                )}
            </div> */}

            {/* Property Email and Phone */}
            <div className="contact-info mb30-sm">
                {propertyEmail ? (
                    <p className="mb-1">
                        <strong>Email: </strong>
                        {propertyEmail}
                    </p>
                ) : (
                    <p className="mb-1">Email not available</p>
                )}
                {propertyPrimaryPhone ? (
                    <p className="mb-0">
                        <strong>Phone: </strong>
                        {propertyPrimaryPhone}
                    </p>
                ) : (
                    <p className="mb-0">Phone not available</p>
                )}
            </div>

            {/* Calendar Icon */}
            <div className="ml15">
                {scheduleShowingUrl && (
                    <Link
                        href={scheduleShowingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Schedule a Showing"
                        className="calendar-icon-link"
                    >
                        <Image
                            src="/images/icon/calendar_icon.svg"
                            alt="Calendar Icon"
                            width={110}
                            height={100}
                        />
                    </Link>
                )}
            </div>

        </div>
    );
};

export default CalendarSchedular;
