var adherentApp = angular.module('adherentApp', ['ng-admin']);

adherentApp.config(['NgAdminConfigurationProvider', 'RestangularProvider', function (nga, RestangularProvider) {

    var admin = nga.application('Le parti de gauche')
        .baseApiUrl('http://localhost:8000/api/');

    // User
    var user = nga.entity('people').identifier(nga.field('@id'));
    user.listView().fields([
        nga.field('firstName'),
        nga.field('lastName'),
        nga.field('email')
    ]);
    user.creationView().fields([
        nga.field('gender', 'choice').choices([
            { value: 'm', label: 'Homme' },
            { value: 'f', label: 'Femme' },
            { value: 'n', label: 'Autre' }
        ]),
        nga.field('firstName', 'string'),
        nga.field('lastName', 'string'),
        nga.field('username', 'string'),
        nga.field('plainPassword', 'password'),
        nga.field('email', 'string'),
        nga.field('birthDate', 'date'),
        nga.field('address', 'string'),
        nga.field('zipCode', 'string'),
        nga.field('city', 'string'),
        nga.field('department', 'string'),
        nga.field('region', 'choice').choices([
            { value: 'Alsace', label: 'Alsace' },
            { value: 'Aquitaine', label: 'Aquitaine' },
            { value: 'Auvergne', label: 'Auvergne' },
            { value: 'Basse Normandie', label: 'Basse Normandie' },
            { value: 'Bourgogne', label: 'Bourgogne' },
            { value: 'Bretagne', label: 'Bretagne' },
            { value: 'Centre', label: 'Centre' },
            { value: 'Champagne-Ardenne', label: 'Champagne-Ardenne' },
            { value: 'Franche-Comté', label: 'Franche-Comté' },
            { value: 'Haute Normandie', label: 'Haute Normandie' },
            { value: 'Ile-de-France', label: 'Ile-de-France' },
            { value: 'Languedoc-Roussillon', label: 'Languedoc-Roussillon' },
            { value: 'Limousin', label: 'Limousin' },
            { value: 'Lorraine', label: 'Lorraine' },
            { value: 'Midi-Pyrénées', label: 'Midi-Pyrénées' },
            { value: 'Nord-Pas-de-Calais', label: 'Nord-Pas-de-Calais' },
            { value: 'Pays de la Loire', label: 'Pays de la Loire' },
            { value: 'Picardie', label: 'Picardie' },
            { value: 'Poitou-Charentes', label: 'Poitou-Charentes' },
            { value: 'Provence-Alpes-Côte-d\'Azur', label: 'Provence-Alpes-Côte-d\'Azur' },
            { value: 'Rhône-Alpes', label: 'Rhône-Alpes' }
        ]),
        nga.field('mobilePhone', 'string'),
        nga.field('phone', 'string'),
        nga.field('job', 'string')
    ]);
    admin.addEntity(user);

    // OrganType
    var organType = nga.entity('organ_types').identifier(nga.field('@id'));
    organType.listView().fields([
        nga.field('name')
    ]);
    organType.creationView().fields([
        nga.field('name', 'string')
    ]);
    organType.editionView().fields([
        nga.field('name', 'string')
    ]);
    organType.showView().fields([
        nga.field('name', 'string')
    ]);
    admin.addEntity(organType);

    // Organ
    var organ = nga.entity('organs').identifier(nga.field('@id'));
    organ.listView().fields([
        nga.field('name'),
        nga.field('createDate'),
        nga.field('organType')
    ]);
    admin.addEntity(organ);


    nga.configure(admin);





    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
        if (operation == "getList") {
            response.totalCount = data['hydra:totalItems'];
            data = data['hydra:member'];
        }

        return data;
    });

    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
        if (operation == 'getList' && what == 'entityName') {
            params.page = params._page;
            params.limit = params._perPage;
            delete params._page;
            delete params._perPage;
        }

        return { params: params };
    });

}]);
