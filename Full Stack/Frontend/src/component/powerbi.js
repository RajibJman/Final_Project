import React from 'react'

export default function Powerbi() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <iframe
            title="finalproject"
            width="100%"
            height="600"
            src="https://app.powerbi.com/reportEmbed?reportId=6c276684-892e-406e-bc38-42d18e71124b&autoAuth=true&ctid=2800c0a0-70e9-49be-8733-faeaa6aced99"
            frameborder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}
