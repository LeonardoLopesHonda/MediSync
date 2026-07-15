import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import NavBar from './NavBar'

describe('NavBar', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows the backend as online once the health check resolves', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ json: () => Promise.resolve({ status: 'ok' }) })),
    )

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    )

    expect(await screen.findByText('AI online')).toBeInTheDocument()
  })

  it('shows the backend as offline when the health check fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('network error'))),
    )

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    )

    expect(await screen.findByText('AI offline')).toBeInTheDocument()
  })
})
