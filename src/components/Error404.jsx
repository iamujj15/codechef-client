import React from "react";
import { Link } from "react-router-dom";
import '../App.css'

function Error404() {
    return (
        <div>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            <section class="error-page section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 offset-lg-3 col-12">

                            <div class="error-inner">
                                <h1>404<span>Oop's  sorry we can't find that page!</span></h1>
                                <p>
                                    The page you were looking for doesn't exist.
                                    You may have mistyped the address or the page may have moved.
                                </p>
                                <Link class="btn btn-primary" to="/"><i class="fa fa-home"></i> Back to homepage</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Error404;