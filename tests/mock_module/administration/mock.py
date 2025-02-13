# -*- coding: utf-8 -*-
#
# This file is part of Invenio.
# Copyright (C) 2022 CERN.
#
# Invenio is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.
"""Mock view for testing."""

from invenio_administration.views.base import (
    AdminResourceDetailView,
    AdminResourceListView,
)


class MockView(AdminResourceDetailView):
    """Creates a mock AdminView for testing.

    resource_config must match the mock resource's name
    """

    name = "mock"
    category = "Test category"
    url = "mocked_details_url"
    resource_config = "mocks"


class MockViewAlternate(AdminResourceListView):
    """Creates a mock AdminView for testing.

    resource_config must match the mock resource's name
    """

    name = "mock alternate"
    category = "Test category"
    url = "mocked_details_alternate_url"
    resource_config = "mocks"
